# group_check.py
#
# Rebuilds the FA-AAC group assignments using the ACTUAL
# Idx_Sample values present in FA_AAC_features.csv.
#
# This avoids row-order alignment problems.

from pathlib import Path
import pandas as pd


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

RAW_FILE = BASE_DIR / "dataset" / "raw data" / "FA-ACC dataset.csv"

FEATURE_FILE = BASE_DIR / "dataset" / "processed" / "FA_AAC_features.csv"

OUTPUT_FILE = (
    BASE_DIR
    / "dataset"
    / "processed"
    / "FA_AAC_group_assignments.csv"
)


# ============================================================
# MAIN
# ============================================================

def main():

    print("=" * 70)
    print("REBUILDING FA-AAC GROUP ASSIGNMENTS")
    print("=" * 70)

    # --------------------------------------------------------
    # 1. Check files
    # --------------------------------------------------------

    if not RAW_FILE.exists():
        raise FileNotFoundError(
            f"Raw dataset not found:\n{RAW_FILE}"
        )

    if not FEATURE_FILE.exists():
        raise FileNotFoundError(
            f"Feature dataset not found:\n{FEATURE_FILE}"
        )

    # --------------------------------------------------------
    # 2. Load raw dataset
    # --------------------------------------------------------

    print("\n[1/6] Loading raw FA-AAC dataset...")

    raw = pd.read_csv(
        RAW_FILE,
        sep=";",
        skiprows=12,
        engine="python",
        encoding="latin1"
    )

    print(f"Raw shape: {raw.shape}")

    # --------------------------------------------------------
    # 3. Clean column names
    # --------------------------------------------------------

    raw.columns = [
        str(col).strip()
        for col in raw.columns
    ]

    # --------------------------------------------------------
    # 4. Normalize sample IDs
    # --------------------------------------------------------

    if "Idx_Sample" not in raw.columns:
        raise ValueError(
            "Idx_Sample not found in raw dataset."
        )

    raw["Idx_Sample"] = pd.to_numeric(
        raw["Idx_Sample"],
        errors="coerce"
    )

    raw = raw[
        raw["Idx_Sample"].notna()
    ].copy()

    raw["Idx_Sample"] = (
        raw["Idx_Sample"]
        .astype(int)
    )

    # --------------------------------------------------------
    # 5. Load actual model sample IDs
    # --------------------------------------------------------

    print("\n[2/6] Loading model sample IDs...")

    features = pd.read_csv(
        FEATURE_FILE
    )

    if "Idx_Sample" not in features.columns:
        raise ValueError(
            "Idx_Sample is missing from FA_AAC_features.csv."
        )

    features["Idx_Sample"] = pd.to_numeric(
        features["Idx_Sample"],
        errors="coerce"
    )

    if features["Idx_Sample"].isna().any():
        raise ValueError(
            "Missing Idx_Sample values in feature dataset."
        )

    features["Idx_Sample"] = (
        features["Idx_Sample"]
        .astype(int)
    )

    feature_ids = set(
        features["Idx_Sample"]
    )

    print(
        f"Model samples: {len(feature_ids)}"
    )

    # --------------------------------------------------------
    # 6. Identify the grouping variable
    # --------------------------------------------------------
    #
    # Original FA-AAC dataset contains:
    #
    #   Ref.
    #   Mixture Code in Ref
    #
    # The grouping should represent samples belonging to
    # the same experimental reference/mix rather than simply
    # using row position.
    #
    # We create a deterministic group from:
    #
    #   Ref. + Mixture Code in Ref
    #
    # --------------------------------------------------------

    print("\n[3/6] Creating experimental groups...")

    if "Ref." not in raw.columns:
        raise ValueError(
            "Column 'Ref.' not found in raw dataset."
        )

    if "Mixture Code in Ref" not in raw.columns:
        raise ValueError(
            "Column 'Mixture Code in Ref' not found "
            "in raw dataset."
        )

    # --------------------------------------------------------
    # Normalize grouping columns
    # --------------------------------------------------------

    raw["Ref_group"] = (
        raw["Ref."]
        .fillna("")
        .astype(str)
        .str.strip()
    )

    raw["Mix_group"] = (
        raw["Mixture Code in Ref"]
        .fillna("")
        .astype(str)
        .str.strip()
    )

    # --------------------------------------------------------
    # Create raw group key
    # --------------------------------------------------------

    raw["group_key"] = (
        raw["Ref_group"]
        + "||"
        + raw["Mix_group"]
    )

    # --------------------------------------------------------
    # Only retain actual model samples
    # --------------------------------------------------------

    model_raw = raw[
        raw["Idx_Sample"].isin(feature_ids)
    ].copy()

    print(
        f"Raw rows matching model samples: "
        f"{len(model_raw)}"
    )

    print(
        f"Unique matching samples: "
        f"{model_raw['Idx_Sample'].nunique()}"
    )

    # --------------------------------------------------------
    # Verify every model sample exists
    # --------------------------------------------------------

    raw_ids = set(
        model_raw["Idx_Sample"]
    )

    missing_from_raw = sorted(
        feature_ids - raw_ids
    )

    if missing_from_raw:
        raise ValueError(
            "These model sample IDs cannot be found "
            "in the raw dataset:\n"
            f"{missing_from_raw}"
        )

    # --------------------------------------------------------
    # Check duplicate sample IDs
    # --------------------------------------------------------

    duplicate_ids = (
        model_raw["Idx_Sample"]
        .value_counts()
    )

    duplicate_ids = duplicate_ids[
        duplicate_ids > 1
    ]

    if len(duplicate_ids) > 0:

        print(
            "\nWARNING: Duplicate sample IDs found "
            "in raw data:"
        )

        print(
            duplicate_ids
        )

    # --------------------------------------------------------
    # Create numeric group IDs
    # --------------------------------------------------------

    print("\n[4/6] Assigning numeric group IDs...")

    unique_keys = (
        model_raw[
            ["group_key"]
        ]
        .drop_duplicates()
        .sort_values("group_key")
        .reset_index(drop=True)
    )

    unique_keys["group"] = (
        range(len(unique_keys))
    )

    # --------------------------------------------------------
    # Merge numeric group back
    # --------------------------------------------------------

    model_raw = model_raw.merge(
        unique_keys,
        on="group_key",
        how="left",
        validate="many_to_one"
    )

    # --------------------------------------------------------
    # Build final assignment table
    # --------------------------------------------------------

    group_assignments = (
        model_raw[
            [
                "Idx_Sample",
                "Ref.",
                "Mixture Code in Ref",
                "group"
            ]
        ]
        .drop_duplicates(
            subset=["Idx_Sample"]
        )
        .sort_values("Idx_Sample")
        .reset_index(drop=True)
    )

    # --------------------------------------------------------
    # Verify sample count
    # --------------------------------------------------------

    print("\n[5/6] Verifying assignments...")

    print(
        f"Assignment rows: "
        f"{len(group_assignments)}"
    )

    print(
        f"Unique samples: "
        f"{group_assignments['Idx_Sample'].nunique()}"
    )

    print(
        f"Unique groups: "
        f"{group_assignments['group'].nunique()}"
    )

    # --------------------------------------------------------
    # Check for missing model IDs
    # --------------------------------------------------------

    assigned_ids = set(
        group_assignments["Idx_Sample"]
    )

    missing_assignments = sorted(
        feature_ids - assigned_ids
    )

    if missing_assignments:
        raise ValueError(
            "Some model samples still have no group:\n"
            f"{missing_assignments}"
        )

    # --------------------------------------------------------
    # Check for duplicate assignments
    # --------------------------------------------------------

    if group_assignments["Idx_Sample"].duplicated().any():
        raise ValueError(
            "Duplicate Idx_Sample values remain "
            "in group assignments."
        )

    # --------------------------------------------------------
    # Group size distribution
    # --------------------------------------------------------

    group_sizes = (
        group_assignments
        .groupby("group")
        .size()
        .sort_values(ascending=False)
    )

    print("\nGroup size distribution:")

    print(
        group_sizes.value_counts()
        .sort_index()
        .to_string()
    )

    print("\nLargest groups:")

    print(
        group_sizes.head(20)
        .to_string()
    )

    # --------------------------------------------------------
    # Save
    # --------------------------------------------------------

    print("\n[6/6] Saving group assignments...")

    group_assignments.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print(
        f"\nSaved:\n{OUTPUT_FILE}"
    )

    print("\n")
    print("=" * 70)
    print("GROUP ASSIGNMENT COMPLETE")
    print("=" * 70)

    print(
        f"Samples : {len(group_assignments)}"
    )

    print(
        f"Groups  : "
        f"{group_assignments['group'].nunique()}"
    )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    main()