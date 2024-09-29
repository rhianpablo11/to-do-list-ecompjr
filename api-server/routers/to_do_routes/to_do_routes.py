from fastapi import APIRouter, HTTPException
from database import schemas

router = APIRouter(prefix='/to-do')

@router.post('/add')
def add_new_to_do(to_do: schemas.To_do_list):
    pass