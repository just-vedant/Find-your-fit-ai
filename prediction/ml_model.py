import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from django.conf import settings
import os

# Load and prepare dataset
def load_dataset(filepath):
    df = pd.read_csv(filepath)
    df = df.dropna(subset=['Height_cm', 'ShoulderWidth_cm'])
    df.columns = df.columns.str.strip()
    return df

# Train model
def train_model(df):
    X = df['Height_cm'].values.reshape(-1, 1)
    y = df[['ShoulderWidth_cm', 'ChestWidth_cm', 'Waist_cm']].values
    return LinearRegression().fit(X, y)

# Define body type categories
BODY_TYPES = {
    'slim_fit': ['ecto', 'invert', 'rect'],
    'loose_fit': ['endo', 'oval', 'trapezoid'],
    'regular_fit': ['hourglass', 'meso', 'tri']
}

# Size ranges remain the same
SIZE_RANGES = {
    'slim_fit': {
        'XS': {'chest': (85, 90), 'waist': (73, 78)},
        'S': {'chest': (90, 95), 'waist': (78, 82)},
        'M': {'chest': (95, 100), 'waist': (82, 87)},
        'L': {'chest': (100, 105), 'waist': (87, 92)},
        'XL': {'chest': (105, 110), 'waist': (92, 97)},
        '2XL': {'chest': (110, 115), 'waist': (97, 102)},
        '3XL': {'chest': (115, float('inf')), 'waist': (102, float('inf'))}
    },
    'loose_fit': {
        'XS': {'chest': (85, 90), 'waist': (73, 78)},
        'S': {'chest': (90, 95), 'waist': (78, 82)},
        'M': {'chest': (95, 100), 'waist': (82, 87)},
        'L': {'chest': (100, 105), 'waist': (87, 92)},
        'XL': {'chest': (105, 110), 'waist': (92, 97)},
        '2XL': {'chest': (110, 115), 'waist': (97, 102)},
        '3XL': {'chest': (115, float('inf')), 'waist': (102, float('inf'))}
    },
    'regular_fit': {
        'XS': {'chest': (85, 90), 'waist': (73, 78)},
        'S': {'chest': (90, 95), 'waist': (78, 82)},
        'M': {'chest': (95, 100), 'waist': (82, 87)},
        'L': {'chest': (100, 105), 'waist': (87, 92)},
        'XL': {'chest': (105, 110), 'waist': (92, 97)},
        '2XL': {'chest': (110, 115), 'waist': (97, 102)},
        '3XL': {'chest': (115, float('inf')), 'waist': (102, float('inf'))}
    }
}

def get_fit_category(body_type):
    """Determine fit category based on body type"""
    print(f"\nDEBUG - get_fit_category input: body_type = {body_type}")
    
    if body_type is None:
        print("DEBUG - body_type is None, returning regular_fit")
        return 'regular_fit'
    
    body_type = body_type.lower()
    print(f"DEBUG - lowercase body_type = {body_type}")
    
    for fit_type, types in BODY_TYPES.items():
        print(f"DEBUG - checking fit_type: {fit_type}, types: {types}")
        if body_type in types:
            print(f"DEBUG - MATCH FOUND! Returning fit_type: {fit_type}")
            return fit_type
    
    print("DEBUG - No match found, returning regular_fit")
    return 'regular_fit'

def get_size(chest, waist, body_type):
    """Determine size and fit based on measurements and body type"""
    print(f"\nDEBUG - get_size inputs: chest = {chest}, waist = {waist}, body_type = {body_type}")
    
    fit_category = get_fit_category(body_type)
    print(f"DEBUG - fit_category returned from get_fit_category: {fit_category}")
    
    ranges = SIZE_RANGES[fit_category]
    print(f"DEBUG - using ranges for fit_category: {fit_category}")
    
    for size, measurements in ranges.items():
        if (measurements['chest'][0] <= chest < measurements['chest'][1] and 
            measurements['waist'][0] <= waist < measurements['waist'][1]):
            print(f"DEBUG - Found matching size: {size}")
            return size, fit_category
    
    if chest >= ranges['3XL']['chest'][0] or waist >= ranges['3XL']['waist'][0]:
        print("DEBUG - Measurements exceed 3XL")
        return '3XL', fit_category
    elif chest < ranges['XS']['chest'][0] or waist < ranges['XS']['waist'][0]:
        print("DEBUG - Measurements below XS")
        return 'XS', fit_category
    
    print("DEBUG - No exact match found, returning default M")
    return 'M', fit_category

def predict_measurements(height, body_type=None):
    """Predict measurements and determine size based on height and body type"""
    print(f"\nDEBUG - predict_measurements inputs: height = {height}, body_type = {body_type}")
    
    try:
        height = float(height)
        if height <= 0:
            raise ValueError("Height must be positive")
        
        prediction = model.predict(np.array([[height]]))[0]
        shoulder, chest, waist = prediction
        print(f"DEBUG - Predicted measurements: shoulder = {shoulder}, chest = {chest}, waist = {waist}")
        
        size, fit_type = get_size(chest, waist, body_type)
        print(f"DEBUG - Final size and fit_type before formatting: {size}, {fit_type}")
        
        formatted_fit_type = fit_type.replace('_', ' ').title()
        print(f"DEBUG - Formatted fit_type: {formatted_fit_type}")
        
        result = {
            "shoulder_width": round(shoulder, 2),
            "chest": round(chest, 2),
            "waist": round(waist, 2),
            "size": size,
            "fit_type": formatted_fit_type
        }
        print(f"DEBUG - Final result: {result}")
        return result
        
    except Exception as e:
        print(f"DEBUG - Error occurred: {str(e)}")
        return {
            "error": "Failed to make prediction",
            "details": str(e)
        }

# Initialize model
dataset_path = '/home/vedant/Desktop/find_your_fit_ai/backend/prediction/static/dataset/synthetic_body_measurements.csv'
df = load_dataset(dataset_path)
model = train_model(df)