import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from django.conf import settings
import os

# Load dataset
dataset_path = os.path.join(settings.BASE_DIR, 'prediction', 'static', 'dataset', 'Body Measurements _ original_CSV.csv')
# /home/vedant/Desktop/find_your_fit_ai/backend/prediction/static/dataset/Body Measurements _ original_CSV.csv
df = pd.read_csv('/home/vedant/Desktop/find_your_fit_ai/backend/prediction/static/dataset/Body Measurements _ original_CSV.csv')

# Clean dataset (Drop rows with NaN values)
df = df.dropna(subset=['TotalHeight', 'ShoulderWidth' ])
print(df.columns)
df.columns = df.columns.str.strip()


# Features and Target
X = df['TotalHeight'].values.reshape(-1, 1)
y = df[['ShoulderWidth', 'ChestWidth', 'Waist']].values

# Train the model
model = LinearRegression().fit(X, y)

# Prediction function
def predict_measurements(height):
    prediction = model.predict(np.array([[height]]))[0]
    shoulder, chest, waist = prediction
    size = get_size(chest, waist)
    return {
        "shoulder_width": round(shoulder, 2),
        "chest": round(chest, 2),
        "waist": round(waist, 2),
        "size": size
    }

# Size classification logic
def get_size(chest, waist):
    if chest < 85 and waist < 75:
        return 'S'
    elif chest < 95 and waist < 85:
        return 'M'
    elif chest < 105 and waist < 95:
        return 'L'
    else:
        return 'XL'
