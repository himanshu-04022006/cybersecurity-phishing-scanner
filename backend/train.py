import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
data = pd.read_csv("data/ids_train.csv")

# Separate features and label
X = data.drop("label", axis=1)
y = data["label"]

# Convert all text columns in X into numbers
X = pd.get_dummies(X)

# Convert label if it is text
if y.dtype == "object":
    y = pd.factorize(y)[0]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create model
model = RandomForestClassifier(random_state=42)

# Train model
model.fit(X_train, y_train)

# Test model
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Create models folder if not exists
os.makedirs("models", exist_ok=True)

# Save model
joblib.dump(model, "models/ids_rf.joblib")

print("Model saved successfully!")