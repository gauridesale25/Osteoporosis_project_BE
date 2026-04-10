import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image

model = load_model('../model/model.h5')

classes = ['Normal', 'Doubtful', 'Mild', 'Moderate', 'Severe']

def predict_image(image_path):
    try:
        img = Image.open(image_path).convert('L')  # grayscale
        img = img.resize((256, 256))
        
        img_array = np.array(img) / 255.0
        img_array = img_array.reshape(1, 256, 256, 1)

        predictions = model.predict(img_array)[0]
        max_index = np.argmax(predictions)
        confidence = float(predictions[max_index])
        result = classes[max_index]


        return {
            "prediction": classes[max_index],
            "confidence": confidence,
            "all_probs": dict(zip(classes, predictions.tolist()))
        }
    except Exception as e:
        return {
            "error": str(e)
        }