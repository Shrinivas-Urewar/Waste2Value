import pandas as pd
from pathlib import Path


# ============================================================
# CONFIG
# ============================================================

INPUT = "dataset/processed/FA_AAC_model_ready.csv"

OUTPUT_DIR = Path("dataset/processed")
OUTPUT_DIR.mkdir(
    parents=True,
    exist_ok=True
)

OUTPUT = (
    OUTPUT_DIR /
    "FA_AAC_features.csv"
)


# ============================================================
# HEADER
# ============================================================

print("=" * 70)
print("BUILDING LEAKAGE-SAFE FEATURE DATASET")
print("=" * 70)


# ============================================================
# LOAD DATA
# ============================================================

df = pd.read_csv(INPUT)

print(
    f"\nInput shape: {df.shape}"
)


TARGET = "converted_strength_28d"


# ============================================================
# 1. REMOVE COMPLETELY EMPTY COLUMNS
# ============================================================

empty_cols = [
    col
    for col in df.columns
    if df[col].isna().all()
]


if empty_cols:

    print(
        "\nRemoving completely empty columns:"
    )

    for col in empty_cols:
        print(
            f"  - {col}"
        )

    df.drop(
        columns=empty_cols,
        inplace=True
    )


# ============================================================
# 2. VERIFY SAMPLE ID
# ============================================================

if "Idx_Sample" not in df.columns:

    raise ValueError(
        "Idx_Sample is missing from "
        "FA_AAC_model_ready.csv."
    )


# Convert ID to numeric.
df["Idx_Sample"] = pd.to_numeric(
    df["Idx_Sample"],
    errors="coerce"
)


# Verify no missing IDs.
if df["Idx_Sample"].isna().any():

    missing_count = (
        df["Idx_Sample"].isna().sum()
    )

    raise ValueError(
        f"{missing_count} rows have missing "
        "Idx_Sample."
    )


df["Idx_Sample"] = (
    df["Idx_Sample"]
    .astype(int)
)


# Verify uniqueness.
if df["Idx_Sample"].duplicated().any():

    duplicate_ids = (
        df.loc[
            df["Idx_Sample"].duplicated(
                keep=False
            ),
            "Idx_Sample"
        ]
        .tolist()
    )

    raise ValueError(
        "Duplicate Idx_Sample values found:\n"
        f"{duplicate_ids}"
    )


# ============================================================
# 3. COLUMNS THAT IDENTIFY THE EXPERIMENT
# ============================================================

ID_COLUMNS = [
    "Idx_Sample",
    "Ref.",
    "Mixture Code in Ref",
]


# ============================================================
# 4. LEAKAGE COLUMNS
# ============================================================

LEAKAGE_COLUMNS = [

    # Cube compressive strength
    "cube_strength_1d",
    "cube_strength_3d",
    "cube_strength_7d",
    "cube_strength_28d",
    "cube_strength_90d",
    "cube_strength_365d",

    # Cylinder compressive strength
    "cylinder_strength_1d",
    "cylinder_strength_3d",
    "cylinder_strength_7d",
    "cylinder_strength_28d",
    "cylinder_strength_90d",
    "cylinder_strength_365d",

    # Converted compressive strength
    "converted_strength_1d",
    "converted_strength_3d",
    "converted_strength_7d",
    "converted_strength_28d",
    "converted_strength_90d",
    "converted_strength_365d",

    # Tensile strength
    "tensile_strength_3d",
    "tensile_strength_7d",
    "tensile_strength_28d",
    "tensile_strength_90d",
    "tensile_strength_365d",

    # Converted tensile strength
    "converted_tensile_strength_3d",
    "converted_tensile_strength_7d",
    "converted_tensile_strength_28d",
    "converted_tensile_strength_90d",
    "converted_tensile_strength_365d",

    # Young's modulus
    "3-d Ec (MPa)",
    "7-d Ec (MPa)",
    "28-d Ec (MPa)",
    "90-d Ec (MPa)",
    "365-d Ec (MPa)",

    # Porosity
    "28-d Porosity/AVPV (%)",
    "90-d Porosity/AVPV (%)",
    "365-d Porosity/AVPV (%)",

    # Carbon footprint
    "CO2 footprint",
]


# ============================================================
# 5. REMOVE IDS + LEAKAGE COLUMNS
# ============================================================

remove_columns = [
    col
    for col in (
        ID_COLUMNS +
        LEAKAGE_COLUMNS
    )
    if col in df.columns
]


print(
    "\nRemoving non-feature columns:"
)


for col in remove_columns:

    print(
        f"  - {col}"
    )


X = df.drop(
    columns=remove_columns
)


# ============================================================
# 6. REMOVE EXTREMELY SPARSE FEATURES
# ============================================================

SPARSE_FEATURES = [

    "NaOH specific gravity",

    "Na2SiO3 specific gravity",

    "flowtable",

    "Initial Setting Time",
]


print(
    "\nRemoving extremely sparse features:"
)


for col in SPARSE_FEATURES:

    if col in X.columns:

        print(
            f"  - {col}"
        )


X.drop(
    columns=[
        col
        for col in SPARSE_FEATURES
        if col in X.columns
    ],
    inplace=True
)


# ============================================================
# 7. REMOVE UNNAMED COLUMNS
# ============================================================

unnamed_columns = [
    col
    for col in X.columns
    if str(col).startswith("Unnamed")
]


if unnamed_columns:

    print(
        "\nRemoving unnamed columns:"
    )

    for col in unnamed_columns:

        print(
            f"  - {col}"
        )

    X.drop(
        columns=unnamed_columns,
        inplace=True
    )


# ============================================================
# 8. VERIFY TARGET
# ============================================================

if TARGET not in df.columns:

    raise ValueError(
        f"Target '{TARGET}' not found."
    )


y = df[TARGET]


# ============================================================
# 9. CREATE FEATURE DATASET
# ============================================================
#
# IMPORTANT:
#
# We preserve Idx_Sample in the saved file as a METADATA KEY.
#
# It is NOT included in X used for model training.
#
# This lets us safely connect:
#
# sample -> features -> group
#
# without using the ID as a predictive feature.
# ============================================================

model_df = X.copy()


# Insert sample ID as the first column.
model_df.insert(
    0,
    "Idx_Sample",
    df["Idx_Sample"].values
)


# Add target at the end.
model_df[TARGET] = y.values


# ============================================================
# 10. SAFETY CHECKS
# ============================================================

print(
    "\n" + "=" * 70
)

print(
    "FEATURE CHECK"
)

print(
    "=" * 70
)


print(
    f"Samples: "
    f"{len(model_df)}"
)


print(
    f"Candidate features: "
    f"{len(X.columns)}"
)


print(
    f"Target values: "
    f"{y.notna().sum()}"
)


print(
    f"Sample IDs: "
    f"{model_df['Idx_Sample'].nunique()}"
)


print(
    "\nCandidate features:"
)


for i, col in enumerate(
    X.columns
):

    missing = (
        X[col].isna().sum()
    )

    pct = (
        missing /
        len(X) *
        100
    )

    print(
        f"{i:3d} | "
        f"{col:45s} | "
        f"missing: {missing:3d} "
        f"({pct:6.2f}%)"
    )


# ============================================================
# 11. FINAL LEAKAGE CHECK
# ============================================================

forbidden = (
    ID_COLUMNS +
    LEAKAGE_COLUMNS
)


remaining_forbidden = [
    col
    for col in X.columns
    if col in forbidden
]


if remaining_forbidden:

    raise ValueError(
        "Leakage/ID columns remain in "
        "the feature matrix:\n"
        f"{remaining_forbidden}"
    )


# ============================================================
# 12. SAVE
# ============================================================

model_df.to_csv(
    OUTPUT,
    index=False
)


# ============================================================
# FINAL SUMMARY
# ============================================================

print(
    "\n" + "=" * 70
)

print(
    "FEATURE DATASET CREATED"
)

print(
    "=" * 70
)

print(
    f"Shape: {model_df.shape}"
)

print(
    f"ML features: {len(X.columns)}"
)

print(
    "Metadata column: Idx_Sample"
)

print(
    f"Saved: {OUTPUT}"
)

print(
    "\nImportant:"
)

print(
    "Idx_Sample is retained only as a "
    "row-identity key."
)

print(
    "It must NOT be passed to the ML model."
)

print(
    "\nDone."
)