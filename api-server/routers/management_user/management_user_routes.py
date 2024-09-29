from fastapi import APIRouter, HTTPException
from database import schemas, database
router = APIRouter(prefix='/user')

@router.post('/cadastro/{type_user}', response_model=bool)
def create_user(body: schemas.User, type_user:str):
    if(type_user != 'admin' or type_user != 'common'):
        raise HTTPException(status_code=406, 
                            detail="O cadastro desse tipo de pessoa não é aceito")
    #verificar no banco de dados se aquele email ja é registrado
    if database.verify_email_existance(body.email):
        raise HTTPException(status_code=401, 
                            detail="Já existe um cadastro para esse email")
    
    #colocar no banco de dados o usuario
    else:
        pass
    return True


@router.post('/login', response_model=schemas.UserLogged)
def create_user(body: schemas.User, type_user:str):
    #verificar no banco de dados se aquele email ja é registrado
    if database.verify_email_existance(body.email):
        raise HTTPException(status_code=401, 
                            detail="Já existe um cadastro para esse email")
    
    #colocar no banco de dados o usuario
    else:
        pass
    return True


