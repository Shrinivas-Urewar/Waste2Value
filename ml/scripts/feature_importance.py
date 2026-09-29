import pandas as pd
import numpy as np

from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor

DATASET = "dataset/processed/FA_AAC_features.csv"
TARGET = "converted_strength_28d"

df = pd.read_csv(DATASET)

X = df.drop(columns=[TARGET])
y = df[TARGET]

model = Pipeline([
    (
        "imputer",
        SimpleImputer(strategy="median")
    ),
    (
        "model",
        RandomForestRegressor(
            n_estimators=500,
            min_samples_leaf=2,
            max_features="sqrt",
            random_state=42,
            n_jobs=-1
        )
    )
])

model.fit(X, y)

rf = model.named_steps["model"]

importance = pd.DataFrame({
    "feature": X.columns,
    "importance": rf.feature_importances_
})

importance = (
    importance
    .sort_values("importance", ascending=False)
    .reset_index(drop=True)
)

print("=" * 70)
print("RANDOM FOREST FEATURE IMPORTANCE")
print("=" * 70)

print("\nTop 20 features:\n")

for i, row in importance.head(20).iterrows():
    print(
        f"{i + 1:2d}. "
        f"{row['feature']:45s} "
        f"{row['importance']:.5f}"
    )

importance.to_csv(
    "dataset/processed/feature_importance.csv",
    index=False
)

print(
    "\nSaved to: "
    "dataset/processed/feature_importance.csv"
)
