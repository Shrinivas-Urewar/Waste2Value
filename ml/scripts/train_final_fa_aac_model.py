# train_final_fa_aac_model.py
#
# Final FA-AAC 28-day converted compressive-strength model
#
# Pipeline:
#   FA-AAC features
#       ↓
#   Top-20 features selected by GroupKFold
#       ↓
#   Median imputation
#       ↓
#   Random Forest Regressor
#       ↓
#   Predicted 28-day converted compressive strength (MPa)
#
# Inputs:
#   dataset/processed/FA_AAC_features.csv
#   dataset/processed/feature_sets.csv
#   dataset/processed/feature_selection_cv.csv
#
# Outputs:
#   dataset/models/fa_aac_strength_model.joblib
#   dataset/models/fa_aac_model_metadata.json
#
# IMPORTANT:
#   Idx_Sample is metadata only and is NEVER used as a model feature.


from pathlib import Path
import json

import joblib
import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

PROCESSED_DIR = (
    BASE_DIR
    / "dataset"
    / "processed"
)

MODEL_DIR = (
    BASE_DIR
    / "dataset"
    / "models"
)

FEATURE_DATASET = (
    PROCESSED_DIR
    / "FA_AAC_features.csv"
)

FEATURE_SETS_FILE = (
    PROCESSED_DIR
    / "feature_sets.csv"
)

CV_RESULTS_FILE = (
    PROCESSED_DIR
    / "feature_selection_cv.csv"
)

MODEL_FILE = (
    MODEL_DIR
    / "fa_aac_strength_model.joblib"
)

METADATA_FILE = (
    MODEL_DIR
    / "fa_aac_model_metadata.json"
)


# ============================================================
# CONFIGURATION
# ============================================================

TARGET = "converted_strength_28d"

# We are using the Top-20 feature configuration selected
# during the successful GroupKFold experiment.
SELECTED_TOP_K = 20

RANDOM_STATE = 42

N_ESTIMATORS = 500

MIN_SAMPLES_LEAF = 2

MAX_FEATURES = "sqrt"


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def check_file(path):
    """
    Check that a required input file exists.
    """

    if not path.exists():
        raise FileNotFoundError(
            f"\nRequired file not found:\n{path}"
        )


def safe_float(value):
    """
    Convert a value to a normal Python float.

    Returns None for NaN/infinite values.
    """

    value = float(value)

    if not np.isfinite(value):
        return None

    return value


# ============================================================
# MAIN
# ============================================================

def main():

    print("=" * 70)
    print("TRAINING FINAL FA-AAC MODEL")
    print("=" * 70)

    # ========================================================
    # 1. CHECK INPUT FILES
    # ========================================================

    print("\n[1/8] Checking input files...")

    check_file(FEATURE_DATASET)

    check_file(FEATURE_SETS_FILE)

    check_file(CV_RESULTS_FILE)

    # --------------------------------------------------------
    # Create model directory
    # --------------------------------------------------------

    MODEL_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    print(
        f"Model directory:\n{MODEL_DIR}"
    )

    # ========================================================
    # 2. LOAD FEATURE DATASET
    # ========================================================

    print("\n[2/8] Loading FA-AAC feature dataset...")

    df = pd.read_csv(
        FEATURE_DATASET
    )

    print(
        f"Dataset shape: {df.shape}"
    )

    # --------------------------------------------------------
    # Check target
    # --------------------------------------------------------

    if TARGET not in df.columns:
        raise ValueError(
            f"Target column '{TARGET}' was not found "
            f"in FA_AAC_features.csv."
        )

    # --------------------------------------------------------
    # Check metadata
    # --------------------------------------------------------

    if "Idx_Sample" not in df.columns:
        raise ValueError(
            "Idx_Sample is missing from "
            "FA_AAC_features.csv."
        )

    # ========================================================
    # 3. LOAD EXACT FEATURE SET FROM CV
    # ========================================================

    print(
        "\n[3/8] Loading exact Top-20 feature set "
        "from cross-validation..."
    )

    feature_sets = pd.read_csv(
        FEATURE_SETS_FILE
    )

    print(
        f"Feature-set file shape: "
        f"{feature_sets.shape}"
    )

    # --------------------------------------------------------
    # Check required columns
    # --------------------------------------------------------

    required_feature_set_columns = [
        "top_k",
        "rank",
        "feature"
    ]

    for column in required_feature_set_columns:

        if column not in feature_sets.columns:

            raise ValueError(
                f"Column '{column}' is missing from "
                f"feature_sets.csv."
            )

    # --------------------------------------------------------
    # Get Top-20 features
    # --------------------------------------------------------

    selected_features_df = (
        feature_sets[
            feature_sets["top_k"] == SELECTED_TOP_K
        ]
        .sort_values("rank")
        .reset_index(drop=True)
    )

    # --------------------------------------------------------
    # Verify exactly 20 features
    # --------------------------------------------------------

    if len(selected_features_df) != SELECTED_TOP_K:

        raise ValueError(
            f"Expected exactly {SELECTED_TOP_K} "
            f"features for Top-{SELECTED_TOP_K}, "
            f"but found "
            f"{len(selected_features_df)}."
        )

    SELECTED_FEATURES = (
        selected_features_df[
            "feature"
        ]
        .astype(str)
        .tolist()
    )

    # --------------------------------------------------------
    # Check duplicate features
    # --------------------------------------------------------

    if len(
        set(SELECTED_FEATURES)
    ) != len(SELECTED_FEATURES):

        raise ValueError(
            "Duplicate features detected in "
            "feature_sets.csv."
        )

    print("\nSelected features:")

    for i, feature in enumerate(
        SELECTED_FEATURES,
        start=1
    ):

        print(
            f"{i:2d}. {feature}"
        )

    # --------------------------------------------------------
    # Check features against actual dataset
    # --------------------------------------------------------

    missing_features = [
        feature
        for feature in SELECTED_FEATURES
        if feature not in df.columns
    ]

    if missing_features:

        print(
            "\nAvailable dataset columns:"
        )

        for column in df.columns:

            print(
                f"  {column}"
            )

        raise ValueError(
            "\nThe following CV-selected features "
            "are missing from FA_AAC_features.csv:\n"
            + "\n".join(
                f"- {feature}"
                for feature in missing_features
            )
        )

    print(
        "\nAll selected features exist "
        "in the dataset."
    )

    # ========================================================
    # 4. PREPARE TRAINING DATA
    # ========================================================

    print("\n[4/8] Preparing training data...")

    # --------------------------------------------------------
    # IMPORTANT:
    #
    # Only SELECTED_FEATURES are used by the ML model.
    #
    # Idx_Sample is NOT used.
    # Target is NOT used as an input feature.
    # --------------------------------------------------------

    X = df[
        SELECTED_FEATURES
    ].copy()

    y = df[
        TARGET
    ].copy()

    # --------------------------------------------------------
    # Convert target to numeric
    # --------------------------------------------------------

    y = pd.to_numeric(
        y,
        errors="coerce"
    )

    # --------------------------------------------------------
    # Remove rows with missing target
    # --------------------------------------------------------

    valid_target = y.notna()

    X = X.loc[
        valid_target
    ].copy()

    y = y.loc[
        valid_target
    ].copy()

    # --------------------------------------------------------
    # Convert all features to numeric
    # --------------------------------------------------------

    for feature in SELECTED_FEATURES:

        X[feature] = pd.to_numeric(
            X[feature],
            errors="coerce"
        )

    # --------------------------------------------------------
    # Reset indexes
    # --------------------------------------------------------

    X = X.reset_index(
        drop=True
    )

    y = y.reset_index(
        drop=True
    )

    # --------------------------------------------------------
    # Basic checks
    # --------------------------------------------------------

    if len(X) != len(y):

        raise ValueError(
            "X and y have different numbers of rows."
        )

    if len(X) == 0:

        raise ValueError(
            "No training samples remain."
        )

    print(
        f"Training samples: {len(X)}"
    )

    print(
        f"Number of features: {X.shape[1]}"
    )

    print(
        f"Target: {TARGET}"
    )

    # ========================================================
    # MISSINGNESS REPORT
    # ========================================================

    print("\nFeature missingness:")

    missing_counts = X.isna().sum()

    any_missing = False

    for feature, count in missing_counts.items():

        if count > 0:

            any_missing = True

            percentage = (
                count / len(X)
            ) * 100

            print(
                f"  {feature}: "
                f"{count} "
                f"({percentage:.2f}%)"
            )

    if not any_missing:

        print(
            "  No missing feature values."
        )

    # ========================================================
    # 5. FIT MEDIAN IMPUTER
    # ========================================================

    print(
        "\n[5/8] Fitting median imputer..."
    )

    imputer = SimpleImputer(
        strategy="median"
    )

    X_imputed = imputer.fit_transform(
        X
    )

    print(
        f"Imputed matrix shape: "
        f"{X_imputed.shape}"
    )

    # --------------------------------------------------------
    # Store imputer statistics
    # --------------------------------------------------------

    imputer_statistics = {}

    for feature, value in zip(
        SELECTED_FEATURES,
        imputer.statistics_
    ):

        imputer_statistics[
            feature
        ] = safe_float(value)

    # ========================================================
    # 6. TRAIN RANDOM FOREST
    # ========================================================

    print(
        "\n[6/8] Training Random Forest..."
    )

    model = RandomForestRegressor(
        n_estimators=N_ESTIMATORS,
        min_samples_leaf=MIN_SAMPLES_LEAF,
        max_features=MAX_FEATURES,
        random_state=RANDOM_STATE,
        n_jobs=-1
    )

    model.fit(
        X_imputed,
        y
    )

    print(
        "Random Forest training complete."
    )

    # --------------------------------------------------------
    # Training predictions
    #
    # IMPORTANT:
    # These are training metrics, NOT validation metrics.
    # --------------------------------------------------------

    train_predictions = model.predict(
        X_imputed
    )

    y_array = y.to_numpy()

    train_mae = np.mean(
        np.abs(
            y_array
            - train_predictions
        )
    )

    train_rmse = np.sqrt(
        np.mean(
            (
                y_array
                - train_predictions
            ) ** 2
        )
    )

    # ========================================================
    # 7. FEATURE IMPORTANCE + CV METRICS
    # ========================================================

    print(
        "\n[7/8] Preparing model metadata..."
    )

    # --------------------------------------------------------
    # Feature importance
    # --------------------------------------------------------

    feature_importance = pd.DataFrame({
        "feature": SELECTED_FEATURES,
        "importance": model.feature_importances_
    })

    feature_importance = (
        feature_importance
        .sort_values(
            "importance",
            ascending=False
        )
        .reset_index(drop=True)
    )

    print(
        "\nFinal model feature importance:"
    )

    print(
        feature_importance.to_string(
            index=False,
            float_format=lambda x: f"{x:.6f}"
        )
    )

    # --------------------------------------------------------
    # Load GroupKFold results
    # --------------------------------------------------------

    cv_df = pd.read_csv(
        CV_RESULTS_FILE
    )

    required_cv_columns = [
        "top_k",
        "fold",
        "MAE",
        "RMSE",
        "R2"
    ]

    for column in required_cv_columns:

        if column not in cv_df.columns:

            raise ValueError(
                f"Column '{column}' is missing from "
                f"feature_selection_cv.csv."
            )

    selected_cv = cv_df[
        cv_df["top_k"] == SELECTED_TOP_K
    ].copy()

    if len(selected_cv) == 0:

        raise ValueError(
            f"No CV results found for "
            f"Top-{SELECTED_TOP_K}."
        )

    # --------------------------------------------------------
    # Calculate CV summary
    # --------------------------------------------------------

    cv_metrics = {
        "method": "5-fold GroupKFold",

        "folds": int(
            selected_cv["fold"].nunique()
        ),

        "mae_mean": safe_float(
            selected_cv["MAE"].mean()
        ),

        "mae_std": safe_float(
            selected_cv["MAE"].std()
        ),

        "rmse_mean": safe_float(
            selected_cv["RMSE"].mean()
        ),

        "rmse_std": safe_float(
            selected_cv["RMSE"].std()
        ),

        "r2_mean": safe_float(
            selected_cv["R2"].mean()
        ),

        "r2_std": safe_float(
            selected_cv["R2"].std()
        )
    }

    # ========================================================
    # SAVE MODEL
    # ========================================================

    print(
        "\n[8/8] Saving model and metadata..."
    )

    # --------------------------------------------------------
    # Package model + imputer together
    # --------------------------------------------------------

    model_package = {

        "model": model,

        "imputer": imputer,

        "features": SELECTED_FEATURES,

        "target": TARGET,

        "model_type": (
            "RandomForestRegressor"
        ),

        "random_state": RANDOM_STATE,

        "n_estimators": N_ESTIMATORS,

        "min_samples_leaf": MIN_SAMPLES_LEAF,

        "max_features": MAX_FEATURES
    }

    # --------------------------------------------------------
    # Save .joblib
    # --------------------------------------------------------

    joblib.dump(
        model_package,
        MODEL_FILE
    )

    # --------------------------------------------------------
    # Metadata
    # --------------------------------------------------------

    metadata = {

        "model_name": (
            "FA-AAC 28-day converted "
            "compressive strength predictor"
        ),

        "version": "1.0",

        "dataset": (
            "FA_AAC_features.csv"
        ),

        "target": TARGET,

        "target_unit": "MPa",

        "training_samples": int(
            len(X)
        ),

        "feature_count": int(
            len(SELECTED_FEATURES)
        ),

        "features": SELECTED_FEATURES,

        "excluded_columns": [
            "Idx_Sample"
        ],

        "preprocessing": {

            "method": (
                "SimpleImputer(strategy='median')"
            ),

            "missing_value_strategy": (
                "median"
            ),

            "imputer_statistics": (
                imputer_statistics
            )
        },

        "model": {

            "type": (
                "RandomForestRegressor"
            ),

            "n_estimators": (
                N_ESTIMATORS
            ),

            "min_samples_leaf": (
                MIN_SAMPLES_LEAF
            ),

            "max_features": (
                MAX_FEATURES
            ),

            "random_state": (
                RANDOM_STATE
            )
        },

        "validation": {

            "feature_selection": (
                "Top-20 features from "
                "GroupKFold evaluation"
            ),

            "method": (
                "5-fold GroupKFold"
            ),

            "group_definition": (
                "Ref. + Mixture Code in Ref"
            ),

            "metrics": cv_metrics
        },

        "training_metrics": {

            "note": (
                "Training metrics are descriptive "
                "only and must not be reported as "
                "validation performance."
            ),

            "mae": safe_float(
                train_mae
            ),

            "rmse": safe_float(
                train_rmse
            )
        },

        "feature_importance": [

            {
                "feature": row["feature"],

                "importance": safe_float(
                    row["importance"]
                )
            }

            for _, row
            in feature_importance.iterrows()
        ]
    }

    # --------------------------------------------------------
    # Save JSON metadata
    # --------------------------------------------------------

    with open(
        METADATA_FILE,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            metadata,
            f,
            indent=4
        )

    # ========================================================
    # FINAL REPORT
    # ========================================================

    print("\n")
    print("=" * 70)
    print("FINAL FA-AAC MODEL READY")
    print("=" * 70)

    print(
        f"\nTraining samples : "
        f"{len(X)}"
    )

    print(
        f"Features         : "
        f"{len(SELECTED_FEATURES)}"
    )

    print(
        f"Target           : "
        f"{TARGET}"
    )

    print(
        f"Target mean      : "
        f"{y.mean():.3f} MPa"
    )

    print(
        f"Target std       : "
        f"{y.std():.3f} MPa"
    )

    print(
        f"Target min       : "
        f"{y.min():.3f} MPa"
    )

    print(
        f"Target max       : "
        f"{y.max():.3f} MPa"
    )

    # --------------------------------------------------------
    # Validation metrics
    # --------------------------------------------------------

    print(
        "\nGroup-aware CV metrics "
        "for Top-20 features:"
    )

    print(
        f"MAE  : "
        f"{cv_metrics['mae_mean']:.3f} "
        f"+/- "
        f"{cv_metrics['mae_std']:.3f} MPa"
    )

    print(
        f"RMSE : "
        f"{cv_metrics['rmse_mean']:.3f} "
        f"+/- "
        f"{cv_metrics['rmse_std']:.3f} MPa"
    )

    print(
        f"R²   : "
        f"{cv_metrics['r2_mean']:.3f} "
        f"+/- "
        f"{cv_metrics['r2_std']:.3f}"
    )

    # --------------------------------------------------------
    # Training metrics
    # --------------------------------------------------------

    print(
        "\nTraining-set metrics "
        "(NOT validation performance):"
    )

    print(
        f"MAE  : "
        f"{train_mae:.3f} MPa"
    )

    print(
        f"RMSE : "
        f"{train_rmse:.3f} MPa"
    )

    # --------------------------------------------------------
    # Output files
    # --------------------------------------------------------

    print(
        "\nModel saved to:"
    )

    print(
        MODEL_FILE
    )

    print(
        "\nMetadata saved to:"
    )

    print(
        METADATA_FILE
    )

    print("\nDone.")


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    main()