import numpy as np
from PIL import Image
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "model" / "model.h5"

classes = ['Normal', 'Doubtful', 'Mild', 'Moderate', 'Severe']

_model = None


def get_model():
    global _model

    if _model is None:
        from tensorflow.keras.models import load_model
        print("Loading TensorFlow model...")
        _model = load_model(MODEL_PATH)

    return _model


def predict_image(image_path):
    try:
        model = get_model()

        img = Image.open(image_path).convert('L')
        img = img.resize((256, 256))

        img_array = np.array(img) / 255.0
        img_array = img_array.reshape(1, 256, 256, 1)

        predictions = model.predict(img_array)[0]
        max_index = np.argmax(predictions)
        confidence = float(predictions[max_index])

        return {
            "prediction": classes[max_index],
            "confidence": confidence,
            "all_probs": dict(zip(classes, predictions.tolist()))
        }

    except Exception as e:
        return {
            "error": str(e)
        }