# feature_selection_cv.py
#
# Group-aware feature selection and cross-validation
# for the FA-AAC 28-day converted compressive-strength model.
#
# Important:
# - Idx_Sample is metadata only and is NEVER used as an ML feature.
# - Groups are joined using the actual Idx_Sample.
# - GroupKFold prevents samples from the same reference/mix group
#   from appearing in both training and validation folds.
#
# Outputs:
#   dataset/processed/feature_selection_cv.csv
#   dataset/processed/feature_sets.csv

from pathlib import Path

import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import GroupKFold


# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

PROCESSED_DIR = BASE_DIR / "dataset" / "processed"

FEATURE_DATASET = PROCESSED_DIR / "FA_AAC_features.csv"
IMPORTANCE_FILE = PROCESSED_DIR / "feature_importance.csv"
GROUP_FILE = PROCESSED_DIR / "FA_AAC_group_assignments.csv"
MODEL_READY_FILE = PROCESSED_DIR / "FA_AAC_model_ready.csv"

OUTPUT_CV = PROCESSED_DIR / "feature_selection_cv.csv"
OUTPUT_FEATURE_SETS = PROCESSED_DIR / "feature_sets.csv"

TARGET = "converted_strength_28d"

RANDOM_STATE = 42
N_SPLITS = 5

TOP_K_VALUES = [10, 15, 20, 30, 50]


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def check_file_exists(path):
    """Check that an expected input file exists."""
    if not path.exists():
        raise FileNotFoundError(
            f"\nRequired file not found:\n{path}\n"
        )


def evaluate_model(X_train, X_test, y_train, y_test):
    """
    Train Random Forest with median imputation and return metrics.
    """

    # --------------------------------------------------------
    # Impute missing values using training data only
    # --------------------------------------------------------
    imputer = SimpleImputer(strategy="median")

    X_train_imp = imputer.fit_transform(X_train)
    X_test_imp = imputer.transform(X_test)

    # --------------------------------------------------------
    # Random Forest
    # --------------------------------------------------------
    model = RandomForestRegressor(
        n_estimators=500,
        min_samples_leaf=2,
        max_features="sqrt",
        random_state=RANDOM_STATE,
        n_jobs=-1
    )

    model.fit(X_train_imp, y_train)

    predictions = model.predict(X_test_imp)

    # --------------------------------------------------------
    # Metrics
    # --------------------------------------------------------
    mae = mean_absolute_error(y_test, predictions)

    rmse = np.sqrt(
        mean_squared_error(y_test, predictions)
    )

    r2 = r2_score(y_test, predictions)

    return mae, rmse, r2


# ============================================================
# MAIN
# ============================================================

def main():

    print("=" * 70)
    print("FA-AAC GROUP-AWARE FEATURE SELECTION")
    print("=" * 70)

    # ========================================================
    # 1. CHECK INPUT FILES
    # ========================================================

    print("\n[1/8] Checking input files...")

    check_file_exists(FEATURE_DATASET)
    check_file_exists(IMPORTANCE_FILE)
    check_file_exists(GROUP_FILE)
    check_file_exists(MODEL_READY_FILE)

    print("All required files found.")

    # ========================================================
    # 2. LOAD FEATURE DATASET
    # ========================================================

    print("\n[2/8] Loading feature dataset...")

    features = pd.read_csv(FEATURE_DATASET)

    print(f"Feature dataset shape: {features.shape}")

    # --------------------------------------------------------
    # Verify Idx_Sample exists
    # --------------------------------------------------------

    if "Idx_Sample" not in features.columns:
        raise ValueError(
            "Idx_Sample is missing from FA_AAC_features.csv.\n"
            "Run the corrected build_features.py first."
        )

    # --------------------------------------------------------
    # Convert sample IDs to integers
    # --------------------------------------------------------

    features["Idx_Sample"] = pd.to_numeric(
        features["Idx_Sample"],
        errors="coerce"
    )

    if features["Idx_Sample"].isna().any():
        raise ValueError(
            "Missing or invalid Idx_Sample values found "
            "in FA_AAC_features.csv."
        )

    features["Idx_Sample"] = features["Idx_Sample"].astype(int)

    # --------------------------------------------------------
    # Check target
    # --------------------------------------------------------

    if TARGET not in features.columns:
        raise ValueError(
            f"Target column '{TARGET}' is missing."
        )

    # --------------------------------------------------------
    # Check sample IDs
    # --------------------------------------------------------

    n_samples = len(features)
    n_unique_ids = features["Idx_Sample"].nunique()

    print(f"Number of rows: {n_samples}")
    print(f"Unique sample IDs: {n_unique_ids}")

    if n_samples != n_unique_ids:
        raise ValueError(
            "Duplicate Idx_Sample values detected."
        )

    # ========================================================
    # 3. LOAD FEATURE IMPORTANCE
    # ========================================================

    print("\n[3/8] Loading feature importance ranking...")

    importance = pd.read_csv(IMPORTANCE_FILE)

    print(f"Importance file shape: {importance.shape}")

    # --------------------------------------------------------
    # Automatically identify feature-name column
    # --------------------------------------------------------

    possible_feature_columns = [
        "feature",
        "Feature",
        "features",
        "Features"
    ]

    feature_column = None

    for col in possible_feature_columns:
        if col in importance.columns:
            feature_column = col
            break

    if feature_column is None:
        raise ValueError(
            "Could not find the feature-name column in "
            "feature_importance.csv.\n"
            "Expected one of: "
            + ", ".join(possible_feature_columns)
        )

    # --------------------------------------------------------
    # Automatically identify importance column
    # --------------------------------------------------------

    possible_importance_columns = [
        "importance",
        "Importance",
        "feature_importance",
        "Feature Importance"
    ]

    importance_column = None

    for col in possible_importance_columns:
        if col in importance.columns:
            importance_column = col
            break

    if importance_column is None:
        raise ValueError(
            "Could not find the feature-importance column in "
            "feature_importance.csv."
        )

    # --------------------------------------------------------
    # Sort by importance
    # --------------------------------------------------------

    importance = importance.sort_values(
        by=importance_column,
        ascending=False
    ).reset_index(drop=True)

    ranked_features = importance[feature_column].tolist()

    # --------------------------------------------------------
    # Keep only features actually present in dataset
    # --------------------------------------------------------

    available_features = set(features.columns)

    ranked_features = [
        f for f in ranked_features
        if f in available_features
        and f not in ["Idx_Sample", TARGET]
    ]

    print(f"Ranked features available: {len(ranked_features)}")

    if len(ranked_features) == 0:
        raise ValueError(
            "No ranked features are available in "
            "FA_AAC_features.csv."
        )

    # ========================================================
    # 4. LOAD GROUP ASSIGNMENTS
    # ========================================================

    print("\n[4/8] Loading group assignments...")

    group_df = pd.read_csv(GROUP_FILE)

    print(f"Group file shape: {group_df.shape}")

    # --------------------------------------------------------
    # Check required columns
    # --------------------------------------------------------

    required_group_columns = [
        "Idx_Sample",
        "group"
    ]

    for col in required_group_columns:
        if col not in group_df.columns:
            raise ValueError(
                f"Column '{col}' is missing from "
                f"FA_AAC_group_assignments.csv."
            )

    # --------------------------------------------------------
    # Normalize sample IDs
    # --------------------------------------------------------

    group_df["Idx_Sample"] = pd.to_numeric(
        group_df["Idx_Sample"],
        errors="coerce"
    )

    if group_df["Idx_Sample"].isna().any():
        raise ValueError(
            "Invalid Idx_Sample values found in group file."
        )

    group_df["Idx_Sample"] = group_df["Idx_Sample"].astype(int)

    # --------------------------------------------------------
    # Check group sample IDs
    # --------------------------------------------------------

    if group_df["Idx_Sample"].duplicated().any():
        raise ValueError(
            "Duplicate Idx_Sample values detected "
            "in group assignment file."
        )

    print(
        f"Unique samples in group file: "
        f"{group_df['Idx_Sample'].nunique()}"
    )

    print(
        f"Unique groups: "
        f"{group_df['group'].nunique()}"
    )

    # ========================================================
    # 5. MERGE FEATURES + GROUPS USING Idx_Sample
    # ========================================================

    print("\n[5/8] Merging features with groups...")

    # --------------------------------------------------------
    # Select only columns needed for the experiment
    # --------------------------------------------------------

    columns_to_merge = (
        ["Idx_Sample", TARGET]
        + ranked_features
    )

    merged = features[columns_to_merge].merge(
        group_df[["Idx_Sample", "group"]],
        on="Idx_Sample",
        how="left",
        validate="one_to_one"
    )

    # --------------------------------------------------------
    # Verify merge
    # --------------------------------------------------------

    print(f"Merged shape: {merged.shape}")

    if len(merged) != len(features):
        raise ValueError(
            "Merge changed the number of rows."
        )

    if merged["group"].isna().any():
        missing_ids = merged.loc[
            merged["group"].isna(),
            "Idx_Sample"
        ].tolist()

        raise ValueError(
            "Some samples have no group assignment.\n"
            f"Missing sample IDs: {missing_ids}"
        )

    # --------------------------------------------------------
    # Verify expected dataset
    # --------------------------------------------------------

    print(
        f"Samples after merge: "
        f"{merged['Idx_Sample'].nunique()}"
    )

    print(
        f"Groups after merge: "
        f"{merged['group'].nunique()}"
    )

    # --------------------------------------------------------
    # Expected values from verified group_check.py
    # --------------------------------------------------------

    expected_samples = 346
    expected_groups = 304

    if len(merged) != expected_samples:
        print(
            f"\nWARNING: Expected {expected_samples} samples "
            f"but found {len(merged)}."
        )

    if merged["group"].nunique() != expected_groups:
        print(
            f"\nWARNING: Expected {expected_groups} groups "
            f"but found {merged['group'].nunique()}."
        )

    # ========================================================
    # 6. PREPARE GROUP-AWARE CV
    # ========================================================

    print("\n[6/8] Preparing GroupKFold...")

    X_all = merged[ranked_features].copy()

    y = merged[TARGET].copy()

    groups = merged["group"].copy()

    # --------------------------------------------------------
    # Check target
    # --------------------------------------------------------

    if y.isna().any():
        raise ValueError(
            f"Target contains {y.isna().sum()} missing values."
        )

    # --------------------------------------------------------
    # Check feature count
    # --------------------------------------------------------

    print(f"Total ML features: {X_all.shape[1]}")
    print(f"Target: {TARGET}")
    print(f"Target samples: {len(y)}")

    # --------------------------------------------------------
    # Initialize GroupKFold
    # --------------------------------------------------------

    group_kfold = GroupKFold(
        n_splits=N_SPLITS
    )

    # ========================================================
    # 7. EVALUATE TOP-K FEATURE SETS
    # ========================================================

    print("\n[7/8] Running GroupKFold experiments...")

    all_results = []
    feature_set_records = []

    for top_k in TOP_K_VALUES:

        # ----------------------------------------------------
        # Select top-k features
        # ----------------------------------------------------

        selected_features = ranked_features[:top_k]

        print("\n" + "-" * 70)
        print(f"TOP {top_k} FEATURES")
        print("-" * 70)

        print("Features:")

        for i, feature in enumerate(
            selected_features,
            start=1
        ):
            print(f"{i:2d}. {feature}")

        # ----------------------------------------------------
        # Save feature set information
        # ----------------------------------------------------

        for rank, feature in enumerate(
            selected_features,
            start=1
        ):
            feature_set_records.append({
                "top_k": top_k,
                "rank": rank,
                "feature": feature
            })

        # ----------------------------------------------------
        # Create feature matrix
        # ----------------------------------------------------

        X = merged[selected_features].copy()

        fold_mae = []
        fold_rmse = []
        fold_r2 = []

        # ----------------------------------------------------
        # GroupKFold
        # ----------------------------------------------------

        for fold, (train_idx, test_idx) in enumerate(
            group_kfold.split(
                X,
                y,
                groups=groups
            ),
            start=1
        ):

            X_train = X.iloc[train_idx]
            X_test = X.iloc[test_idx]

            y_train = y.iloc[train_idx]
            y_test = y.iloc[test_idx]

            # ------------------------------------------------
            # Evaluate model
            # ------------------------------------------------

            mae, rmse, r2 = evaluate_model(
                X_train,
                X_test,
                y_train,
                y_test
            )

            fold_mae.append(mae)
            fold_rmse.append(rmse)
            fold_r2.append(r2)

            # ------------------------------------------------
            # Count groups
            # ------------------------------------------------

            train_groups = groups.iloc[
                train_idx
            ].nunique()

            test_groups = groups.iloc[
                test_idx
            ].nunique()

            # ------------------------------------------------
            # Save fold result
            # ------------------------------------------------

            all_results.append({
                "top_k": top_k,
                "fold": fold,
                "train_samples": len(train_idx),
                "test_samples": len(test_idx),
                "train_groups": train_groups,
                "test_groups": test_groups,
                "MAE": mae,
                "RMSE": rmse,
                "R2": r2
            })

            print(
                f"Fold {fold}: "
                f"MAE={mae:.3f}, "
                f"RMSE={rmse:.3f}, "
                f"R²={r2:.3f}"
            )

        # ----------------------------------------------------
        # Summary
        # ----------------------------------------------------

        mean_mae = np.mean(fold_mae)
        std_mae = np.std(fold_mae, ddof=1)

        mean_rmse = np.mean(fold_rmse)
        std_rmse = np.std(fold_rmse, ddof=1)

        mean_r2 = np.mean(fold_r2)
        std_r2 = np.std(fold_r2, ddof=1)

        print("\nSummary:")
        print(
            f"MAE  = {mean_mae:.3f} "
            f"+/- {std_mae:.3f}"
        )

        print(
            f"RMSE = {mean_rmse:.3f} "
            f"+/- {std_rmse:.3f}"
        )

        print(
            f"R²   = {mean_r2:.3f} "
            f"+/- {std_r2:.3f}"
        )

    # ========================================================
    # 8. SAVE RESULTS
    # ========================================================

    print("\n[8/8] Saving results...")

    results_df = pd.DataFrame(all_results)

    feature_sets_df = pd.DataFrame(
        feature_set_records
    )

    results_df.to_csv(
        OUTPUT_CV,
        index=False
    )

    feature_sets_df.to_csv(
        OUTPUT_FEATURE_SETS,
        index=False
    )

    # ========================================================
    # FINAL SUMMARY TABLE
    # ========================================================

    summary = (
        results_df
        .groupby("top_k")
        .agg(
            MAE_mean=("MAE", "mean"),
            MAE_std=("MAE", "std"),
            RMSE_mean=("RMSE", "mean"),
            RMSE_std=("RMSE", "std"),
            R2_mean=("R2", "mean"),
            R2_std=("R2", "std")
        )
        .reset_index()
    )

    print("\n")
    print("=" * 70)
    print("FINAL GROUP-AWARE CROSS-VALIDATION SUMMARY")
    print("=" * 70)

    print(
        summary.to_string(
            index=False,
            float_format=lambda x: f"{x:.4f}"
        )
    )

    print("\n")
    print("=" * 70)
    print("OUTPUT FILES")
    print("=" * 70)

    print(f"CV results:")
    print(OUTPUT_CV)

    print(f"\nFeature sets:")
    print(OUTPUT_FEATURE_SETS)

    print("\nDone.")


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    main()