from fastapi import APIRouter, HTTPException
from database import schemas
router = APIRouter(prefix='/user')

@router.post('/cadastro')
def cadastro(body: schemas.User):
    print(body)
    return True