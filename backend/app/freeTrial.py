from fastapi import FastAPI,UploadFile, File
import banana_dev as banana
from dotenv import load_dotenv
from io import BytesIO
import base64
import shutil
import os


app = FastAPI()


load_dotenv()


@app.post("/tryForFree")
async def free_trial(file: UploadFile = File(...)):
    ####### saving the audio file
    with open(f'{file.filename}', "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    api_key = os.getenv("API_KEY")
    model_key = os.getenv("MODEL_KEY")
    fileSize = 5242880
    getSize = os.path.getsize(file.filename)
    print(getSize)
    ###### transcribing the file
    with open(f'{file.filename}', "rb") as file:
        if not file:
            return {"message": "No file sent"}
        elif getSize > fileSize :
            return {"message": "File Must not be lager than 5MB"}
        else:
            ######### Load audio file
            mp3bytes = BytesIO(file.read())
            mp3 = base64.b64encode(mp3bytes.getvalue()).decode("ISO-8859-1")
            model_payload = {"mp3BytesString": mp3}
            out = banana.run(api_key, model_key, model_payload)
            return out['modelOutputs'][0]['text']