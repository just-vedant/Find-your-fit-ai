from django.db import models

class SizePrediction(models.Model):
    height = models.FloatField()
    shoulder_width = models.FloatField()
    chest = models.FloatField()
    waist = models.FloatField()
    size = models.CharField(max_length=10)
    body_type = models.CharField(max_length=20, null=True, blank=True)  # Changed this line
    fit_type = models.CharField(max_length=40, default='Regular Fit')
    created_at = models.DateTimeField(auto_now_add=True)