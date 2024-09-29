from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get('/exemplo')
def exemplo() -> str:
    return 'ola mundoa'