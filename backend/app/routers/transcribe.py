from io import BytesIO
import base64
import banana_dev as banana
from dotenv import load_dotenv
import os

# Load all environment variables
load_dotenv()

api_key = os.getenv("API_KEY")
model_key = os.getenv("MODEL_KEY")

def transcribe_file(filename):
    with open(filename, "rb") as file:
        # Load audio file
        mp3bytes = BytesIO(file.read())
        mp3 = base64.b64encode(mp3bytes.getvalue()).decode("ISO-8859-1")
        model_payload = {"mp3BytesString": mp3}
        out = banana.run(api_key, model_key, model_payload)
        return out['modelOutputs'][0]['text']
