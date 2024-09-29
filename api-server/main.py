from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import root_routes, api_routes
import uvicorn

app = FastAPI()

# Adiciona o middleware para permitir requisições de qualquer origem
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(root_routes.router)
app.include_router(api_routes.router)

if __name__ == '__main__':
    uvicorn.run(app, port=8000)