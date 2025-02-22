from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .ml_model import predict_measurements
from .models import SizePrediction

@csrf_exempt
def size_prediction(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        height = body.get('height')
        if height:
            prediction = predict_measurements(float(height))
            # Save prediction to database
            SizePrediction.objects.create(
                height=height,
                shoulder_width=prediction['shoulder_width'],
                chest=prediction['chest'],
                waist=prediction['waist'],
                size=prediction['size']
            )
            return JsonResponse(prediction)
    return JsonResponse({'error': 'Invalid Request'}, status=400)
