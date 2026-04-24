from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=255, default="Unknown Patient")
    image = models.ImageField(upload_to='xrays/')
    result = models.CharField(max_length=50)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
