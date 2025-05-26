from fastapi import *
from starlette.responses import HTMLResponse

app_router = APIRouter()


@app_router.get("/")
async def index():
    html_data = open("./templates/index.html").read()
    return HTMLResponse(html_data)