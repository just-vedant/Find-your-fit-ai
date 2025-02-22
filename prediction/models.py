from django.db import models

# Create your models here.
class SizePrediction(models.Model):
    height = models.FloatField()
    shoulder_width = models.FloatField()
    chest = models.FloatField()
    waist = models.FloatField()
    size = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    fit_type = models.CharField(max_length=40, default='Regular Fit')