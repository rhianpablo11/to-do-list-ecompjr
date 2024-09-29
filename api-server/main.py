from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import root_routes
from routers.management_user import management_user_routes
from routers.to_do_routes import to_do_routes
import uvicorn
from database import database


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
app.include_router(management_user_routes.router)
app.include_router(to_do_routes.router)

database.create_tables()
if __name__ == '__main__':
    uvicorn.run(app, port=8000)