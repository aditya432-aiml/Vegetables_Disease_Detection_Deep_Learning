
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("../saved_models/1")
MODEL2 = tf.keras.models.load_model("../saved_models/2")
MODEL3 = tf.keras.models.load_model("../saved_models/3")

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]
CLASS_NAMES2 = ['Bacterial_spot',
 'Early_blight',
 'Late_blight',
 'Leaf_Mold',
 'Septoria_leaf_spot',
 'Spider_mites_Two_spotted_spider_mite',
 'Target_Spot',
 'YellowLeaf__Curl_Virus',
 'mosaic_virus',
 'healthy']
CLASS_NAMES3 = ["Bacterial_spot", "Healthy"]

@app.get("/ping")
async def ping():
    return "Hello, I am AJ 3"

@app.get("/ping2")
async def ping():
    return "Hello,pin2 I am AJ 3"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


@app.post("/predict2")
async def predict(
    file: UploadFile = File(...)
):
   image = read_file_as_image(await file.read())
   img_batch = np.expand_dims(image, 0)
   
   predictions = MODEL2.predict(img_batch)

   predicted_class = CLASS_NAMES2[np.argmax(predictions[0])]
   confidence = np.max(predictions[0])
   return {
       'class': predicted_class,
       'confidence': float(confidence)
   }

@app.post("/predict3")
async def predict(
    file: UploadFile = File(...)
):
   image = read_file_as_image(await file.read())
   img_batch = np.expand_dims(image, 0)
   
   predictions = MODEL3.predict(img_batch)

   predicted_class = CLASS_NAMES3[np.argmax(predictions[0])]
   confidence = np.max(predictions[0])
   return {
       'class': predicted_class,
       'confidence': float(confidence)
   }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)