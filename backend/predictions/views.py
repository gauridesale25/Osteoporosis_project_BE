from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Prediction
from .ml_model import predict_image, check_ml_api_health


@api_view(['GET'])
def health_view(request):
    """Check if the HF ML API is reachable. No auth required."""
    is_healthy = check_ml_api_health()
    status_code = 200 if is_healthy else 503
    return Response({"ml_api_online": is_healthy}, status=status_code)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_view(request):
    if 'image' not in request.FILES:
        return Response({"error": "No image file provided."}, status=400)

    image = request.FILES['image']
    patient_name = request.data.get('patient_name', 'Unknown Patient')

    # Step 1: Run ML model FIRST — pass upload file directly, no disk path needed
    result_data = predict_image(image)

    if "error" in result_data:
        return Response(result_data, status=502)

    # Step 2: Save to DB only after successful prediction
    image.seek(0)  # reset file pointer after ml_model.py read it
    prediction = Prediction.objects.create(
        user=request.user,
        patient_name=patient_name,
        image=image,
        result=result_data['prediction'],
        confidence=result_data['confidence'],
    )

    return Response({
        "id": prediction.id,
        "patient_name": prediction.patient_name,
        "prediction": result_data['prediction'],
        "confidence": result_data['confidence'],
        "all_probs": result_data.get('all_probs', {}),
        "severity": result_data.get('severity', {}),
        "class_probabilities": result_data.get('class_probabilities', []),
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def history_view(request):
    data = Prediction.objects.filter(user=request.user).order_by('-created_at')
    res = []
    for item in data:
        res.append({
            "id": item.id,
            "patient_name": item.patient_name,
            "image": request.build_absolute_uri(item.image.url),
            "result": item.result,
            "confidence": item.confidence,
            "date": item.created_at,
        })
    return Response(res)