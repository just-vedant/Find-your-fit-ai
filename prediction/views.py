from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .ml_model import predict_measurements
from .models import SizePrediction

@csrf_exempt
def size_prediction(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            height = body.get('height')
            body_type = body.get('body_type')  # Get body_type from request
            
            if not height:
                return JsonResponse({'error': 'Height is required'}, status=400)
                
            prediction = predict_measurements(
                float(height),
                body_type=body_type  # Pass body_type to prediction function
            )
            
            # Save prediction to database
            SizePrediction.objects.create(
                height=height,
                body_type=body_type,  # Add body_type to database record
                shoulder_width=prediction['shoulder_width'],
                chest=prediction['chest'],
                waist=prediction['waist'],
                size=prediction['size'],
                fit_type=prediction['fit_type']
            )
            
            return JsonResponse(prediction)
            
        except ValueError:
            return JsonResponse({'error': 'Invalid height value'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        
    return JsonResponse({'error': 'Method not allowed'}, status=405)