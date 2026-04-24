from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Prediction
from .ml_model import predict_image

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_view(request):
    image = request.FILES['image']
    patient_name = request.data.get('patient_name', 'Unknown Patient')

    # Step 1: Save temporarily (needed to get file path)
    prediction = Prediction.objects.create(
        user=request.user,
        patient_name=patient_name,
        image=image,
        result="Processing",
        confidence=0.0
    )

    # Step 2: Run ML model
    result_data = predict_image(prediction.image.path)

    if "error" in result_data:
        return Response(result_data, status=500)

    # Step 3: Update DB with real values
    prediction.result = result_data['prediction']
    prediction.confidence = result_data['confidence']
    prediction.save()

    result_data['patient_name'] = prediction.patient_name
    return Response(result_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def history_view(request):
    data = Prediction.objects.filter(user=request.user).order_by('-created_at')

    res = []
    for item in data:
        res.append({
            "id": item.id,
            "patient_name": item.patient_name,
            "image": item.image.url,
            "result": item.result,
            "confidence": item.confidence,
            "date": item.created_at
        })

    return Response(res)
