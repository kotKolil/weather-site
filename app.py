from src.router import *
from fastapi.staticfiles import *
app = FastAPI()
app.mount("/static", StaticFiles(directory="templates/static"), name="static")
app.include_router(app_router)