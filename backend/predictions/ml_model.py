"""
ml_model.py  —  Django service layer for the Hugging Face ML API
----------------------------------------------------------------
Replaces the old local TensorFlow inference with HTTP calls to
the deployed FastAPI on Hugging Face Spaces.
"""

import os
import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)

# ── Config ─────────────────────────────────────────────────────────────────────
ML_API_BASE_URL = getattr(
    settings,
    "HF_ML_API_URL",
    os.environ.get("HF_ML_API_URL", "http://localhost:7860"),
)

REQUEST_TIMEOUT = int(os.environ.get("ML_API_TIMEOUT", 60))

classes = ['Normal', 'Doubtful', 'Mild', 'Moderate', 'Severe']


# ── Public helpers ─────────────────────────────────────────────────────────────

def check_ml_api_health() -> bool:
    """Return True if the remote ML API is reachable and its model is loaded."""
    try:
        resp = requests.get(f"{ML_API_BASE_URL}/health", timeout=10)
        data = resp.json()
        return resp.status_code == 200 and data.get("model_loaded", False)
    except Exception as exc:
        logger.warning("ML API health check failed: %s", exc)
        return False


def predict_image(image_file) -> dict:
    """
    Drop-in replacement for the old local predict_image().

    Accepts a Django uploaded file object OR a file path string.
    Returns the same shape dict as the old function:
        {
            "prediction": "Mild",
            "confidence": 0.87,
            "all_probs": {"Normal": 0.05, "Doubtful": 0.03, ...}
        }
    Or on error:
        {"error": "..."}
    """
    url = f"{ML_API_BASE_URL}/predict"

    try:
        # Handle both file path (string/Path) and Django upload file objects
        if hasattr(image_file, 'read'):
            # Django InMemoryUploadedFile / TemporaryUploadedFile
            image_file.seek(0)
            files = {"file": (image_file.name, image_file, image_file.content_type)}
        else:
            # File path string or Path object
            path = str(image_file)
            with open(path, "rb") as f:
                content = f.read()
            filename = os.path.basename(path)
            files = {"file": (filename, content, "image/png")}

        response = requests.post(url, files=files, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        data = response.json()

        # Reshape HF API response → same format as old local function
        all_probs = {
            item["class"]: round(item["probability"] / 100, 4)
            for item in data.get("class_probabilities", [])
        }

        return {
            "prediction": data["predicted_class"],
            "confidence": round(data["confidence"] / 100, 4),
            "all_probs": all_probs,
            # Extra fields from HF API (bonus — use in views if needed)
            "severity": data.get("severity", {}),
            "class_probabilities": data.get("class_probabilities", []),
        }

    except requests.exceptions.Timeout:
        return {"error": "ML inference service timed out. Please try again."}
    except requests.exceptions.ConnectionError:
        return {"error": "Cannot reach ML inference service. Check HF_ML_API_URL."}
    except requests.exceptions.HTTPError as exc:
        try:
            detail = exc.response.json().get("detail", exc.response.text)
        except Exception:
            detail = str(exc)
        return {"error": f"ML API error: {detail}"}
    except Exception as exc:
        logger.exception("Unexpected error calling ML API")
        return {"error": str(exc)}


def predict_single(image_file) -> dict:
    """Alias kept for compatibility with views.py that use predict_single()."""
    result = predict_image(image_file)
    if "error" in result:
        raise MLAPIError(result["error"])
    return result


def predict_batch(image_files: list) -> dict:
    """Send multiple files to /predict-batch on the HF API."""
    if not image_files:
        raise MLAPIError("No images provided.")
    if len(image_files) > 10:
        raise MLAPIError("Maximum 10 images per batch.")

    url = f"{ML_API_BASE_URL}/predict-batch"

    try:
        files = []
        for f in image_files:
            f.seek(0)
            files.append(("files", (f.name, f, f.content_type)))

        response = requests.post(url, files=files, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        raise MLAPIError("ML inference service timed out.")
    except requests.exceptions.ConnectionError:
        raise MLAPIError("Cannot reach ML inference service.")
    except requests.exceptions.HTTPError as exc:
        try:
            detail = exc.response.json().get("detail", exc.response.text)
        except Exception:
            detail = str(exc)
        raise MLAPIError(f"ML API error: {detail}")
    except Exception as exc:
        logger.exception("Unexpected error in predict_batch")
        raise MLAPIError(str(exc))


# ── Exception ──────────────────────────────────────────────────────────────────

class MLAPIError(Exception):
    """Raised when the ML inference service returns an error or is unreachable."""
    pass