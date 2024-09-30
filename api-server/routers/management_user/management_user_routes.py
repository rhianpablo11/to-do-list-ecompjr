from fastapi import APIRouter, HTTPException, Depends
from database import schemas, database
from security import hash_password, verify_password
from jose import JWTError, jwt

router = APIRouter(prefix='/user')


SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"


def create_access_token(data: dict):
    to_encode = data.copy()
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

@router.post('/cadastro/{type_user}', response_model=bool)
def create_user(body: schemas.User, type_user: str):
    if type_user not in ['admin', 'common']:
        raise HTTPException(status_code=406, detail="O cadastro desse tipo de pessoa não é aceito")
    
    if database.verify_email_existance(body.email):
        raise HTTPException(status_code=401, detail="Já existe um cadastro para esse email")

    # Hash da senha para segurança
    hashed_password = hash_password(body.password)
    
    # Armazenar no banco de dados
    new_user = {
        "email": body.email,
        "password": hashed_password,
        "type_user": type_user
    }
    
    database.create_user(new_user)
    return True

@router.post('/login', response_model=schemas.UserLogged)
def login_user(body: schemas.User):
    user = database.get_user_by_email(body.email)
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if not verify_password(body.password, user['password']):
        raise HTTPException(status_code=401, detail="Senha incorreta")
    
    access_token = create_access_token(data={"email": user['email'], "type_user": user['type_user']})
    
    return schemas.UserLogged(email=user['email'], token=access_token)

# Rota para gerenciamento de usuários
@router.get('/manage-users', response_model=list[schemas.User])
def manage_users(token: str = Depends(database.oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_type = payload.get('type_user')
        
        if user_type != 'admin':
            raise HTTPException(status_code=403, detail="Acesso negado. Apenas administradores podem acessar essa rota.")
    
    except JWTError:
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    users = database.get_all_users()
    return users



# Rota para atualizar um usuário
@router.put('/update/{user_id}', response_model=bool)
def update_user(user_id: int, body: schemas.UserUpdate, token: str = Depends(database.oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_type = payload.get('type_user')
        
        if user_type != 'admin':
            raise HTTPException(status_code=403, detail="Acesso negado. Apenas administradores podem acessar essa rota.")
    
    except JWTError:
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    if not database.user_exists(user_id):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    # Atualizando o usuário
    updated_user = {
        "email": body.email,
        "type_user": body.type_user
    }
    database.update_user(user_id, updated_user)
    return True

# Rota para excluir um usuário
@router.delete('/delete/{user_id}', response_model=bool)
def delete_user(user_id: int, token: str = Depends(database.oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_type = payload.get('type_user')
        
        if user_type != 'admin':
            raise HTTPException(status_code=403, detail="Acesso negado. Apenas administradores podem acessar essa rota.")
    
    except JWTError:
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    if not database.user_exists(user_id):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    database.delete_user(user_id)
    return True

# Rota para obter detalhes de um usuário
@router.get('/details/{user_id}', response_model=schemas.UserDetails)
def get_user_details(user_id: int, token: str = Depends(database.oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_type = payload.get('type_user')
        
        if user_type != 'admin':
            raise HTTPException(status_code=403, detail="Acesso negado. Apenas administradores podem acessar essa rota.")
    
    except JWTError:
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return user
