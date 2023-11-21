from joblib import  load
from PIL import Image, ImageChops, ImageEnhance
import numpy as np
np.random.seed(2)
import uvicorn
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

def convert_to_ela_image(path, quality):
    temp_filename = 'temp_file_name.jpg'
    image = Image.open(path).convert('RGB')
    image.save(temp_filename, 'JPEG', quality=quality)
    temp_image = Image.open(temp_filename)
    ela_image = ImageChops.difference(image, temp_image)
    extrema = ela_image.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    if max_diff == 0:
        max_diff = 1
    scale = 255.0 / max_diff

    ela_image = ImageEnhance.Brightness(ela_image).enhance(scale)
    print("convert_to_ela_image")
    return ela_image

def prepare_image(image_path):
    image_size = (128,128)
    return np.array(convert_to_ela_image(image_path, 90).resize(image_size)).flatten() / 255.0

model = load('C:\\Users\\Ruti\\Desktop\\הפרוייקט - סופי\\model.joblib')
class_names = ['מזוייף', 'אמיתי']

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)



@app.post("/")
async def is_fake(data = Body(...)):
    pathes = data.get('pathes')
    print(pathes)
    results = []
    for path in pathes:
        image = prepare_image(path)
        image = image.reshape(-1, 128, 128, 3)
        y_pred = model.predict(image)
        y_pred_class = np.argmax(y_pred, axis=1)[0]
        print(f'Class: {class_names[y_pred_class]}, Confidence: {np.amax(y_pred) * 100:0.2f}')
        results.append(float(y_pred[0][1]))
    return {"results":results}
    # return {"results":[float(0.97), float(0.34), float(0.67)]}

  
if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=3562)
 
