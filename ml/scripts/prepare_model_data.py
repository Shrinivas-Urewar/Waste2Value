import pandas as pd
from pathlib import Path

INPUT = "dataset/raw data/FA-ACC dataset.csv"
OUTPUT_DIR = Path("dataset/processed")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

OUTPUT = OUTPUT_DIR / "FA_AAC_model_ready.csv"

print("=" * 60)
print("Preparing FA-AAC model dataset")
print("=" * 60)

# ---------------------------------------------------------
# 1. Load original CSV
# ---------------------------------------------------------

df = pd.read_csv(
    INPUT,
    sep=";",
    header=None,
    engine="python",
    encoding="latin1"
)

print(f"Raw file shape: {df.shape}")

# ---------------------------------------------------------
# 2. Extract actual column names
# ---------------------------------------------------------

columns = df.iloc[11].astype(str).str.strip().tolist()

# Make names unique while preserving original order
counts = {}
unique_columns = []

for col in columns:
    if col not in counts:
        counts[col] = 0
        unique_columns.append(col)
    else:
        counts[col] += 1
        unique_columns.append(
            f"{col}__duplicate_{counts[col]}"
        )

# ---------------------------------------------------------
# 3. Extract actual experimental data
# ---------------------------------------------------------

# Data starts immediately after the header row
data = df.iloc[12:].copy()
data.columns = unique_columns

# ---------------------------------------------------------
# 4. Remove rows without a sample ID
# ---------------------------------------------------------

data["Idx_Sample"] = pd.to_numeric(
    data["Idx_Sample"],
    errors="coerce"
)

before = len(data)

data = data[
    data["Idx_Sample"].notna()
].copy()

print(f"Rows before sample filtering: {before}")
print(f"Rows after sample filtering:  {len(data)}")

# ---------------------------------------------------------
# 5. Convert numeric columns
# ---------------------------------------------------------

for col in data.columns:

    if col in ["Ref.", "Mixture Code in Ref"]:
        continue

    # Convert percentage strings such as 14.70%
    if data[col].dtype == "object":
        data[col] = (
            data[col]
            .astype(str)
            .str.replace("%", "", regex=False)
            .str.strip()
        )

    data[col] = pd.to_numeric(
        data[col],
        errors="coerce"
    )

# ---------------------------------------------------------
# 6. Rename the mechanical-property columns
# ---------------------------------------------------------

rename_map = {
    "1-d": "cube_strength_1d",
    "3-d": "cube_strength_3d",
    "7-d": "cube_strength_7d",
    "28-d": "cube_strength_28d",
    "90-d": "cube_strength_90d",
    "365-d": "cube_strength_365d",

    "1-d__duplicate_1": "cylinder_strength_1d",
    "3-d__duplicate_1": "cylinder_strength_3d",
    "7-d__duplicate_1": "cylinder_strength_7d",
    "28-d__duplicate_1": "cylinder_strength_28d",
    "90-d__duplicate_1": "cylinder_strength_90d",
    "365-d__duplicate_1": "cylinder_strength_365d",
}

# The third group is named by pandas as duplicate_2
# because there are three original "1-d", "3-d", etc. groups.
rename_map.update({
    "1-d__duplicate_2": "converted_strength_1d",
    "3-d__duplicate_2": "converted_strength_3d",
    "7-d__duplicate_2": "converted_strength_7d",
    "28-d__duplicate_2": "converted_strength_28d",
    "90-d__duplicate_2": "converted_strength_90d",
    "365-d__duplicate_2": "converted_strength_365d",
})

# Tensile strength groups
rename_map.update({
    "3-d__duplicate_3": "tensile_strength_3d",
    "7-d__duplicate_3": "tensile_strength_7d",
    "28-d__duplicate_3": "tensile_strength_28d",
    "90-d__duplicate_3": "tensile_strength_90d",
    "365-d__duplicate_3": "tensile_strength_365d",

    "3-d__duplicate_4": "converted_tensile_strength_3d",
    "7-d__duplicate_4": "converted_tensile_strength_7d",
    "28-d__duplicate_4": "converted_tensile_strength_28d",
    "90-d__duplicate_4": "converted_tensile_strength_90d",
    "365-d__duplicate_4": "converted_tensile_strength_365d",
})

data.rename(columns=rename_map, inplace=True)

# ---------------------------------------------------------
# 7. Verify target
# ---------------------------------------------------------

TARGET = "converted_strength_28d"

print("\nTarget column:")
print(TARGET)

if TARGET not in data.columns:
    print("\nAvailable mechanical columns:")
    for col in data.columns[61:]:
        print(" ", col)

    raise ValueError(
        "Target column was not found. "
        "Check the duplicate-column mapping."
    )

print(
    f"Target values available: "
    f"{data[TARGET].notna().sum()} / {len(data)}"
)

# ---------------------------------------------------------
# 8. Remove rows without target
# ---------------------------------------------------------

before_target = len(data)

data = data[
    data[TARGET].notna()
].copy()

print(
    f"Rows removed because target is missing: "
    f"{before_target - len(data)}"
)

# ---------------------------------------------------------
# 9. Save
# ---------------------------------------------------------

data.to_csv(
    OUTPUT,
    index=False
)

print("\n" + "=" * 60)
print("MODEL DATASET CREATED")
print("=" * 60)

print(f"Final shape: {data.shape}")
print(f"Saved to: {OUTPUT}")

print("\nTarget statistics:")
print(data[TARGET].describe())

print("\nSample IDs:")
print(
    data["Idx_Sample"]
    .head()
    .tolist()
)

print(
    "...",
    data["Idx_Sample"]
    .tail()
    .tolist()
)
