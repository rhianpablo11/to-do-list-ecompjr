from fastapi import APIRouter, HTTPException
from pydantic.main import BaseModel
from services import services
router = APIRouter(prefix='/user')

class User(BaseModel):
    email: str



@router.get('/exemplo')
def exemplo() -> str:
    return 'oa'


@router.get('/total')
def get_total() -> str:
    total = services.get_total()
    services.incrementa(total)
    return f'O total é de {total}'


@router.post('/cadastro')
def cadastro(body: User):
    print(body)
    return True