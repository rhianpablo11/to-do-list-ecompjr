from fastapi import APIRouter, HTTPException, Depends, Header
from database import schemas, database, security

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
    
    if database.verify_email_existence(body.email):
        raise HTTPException(status_code=401, detail="Já existe um cadastro para esse email")

    # Hash da senha para segurança
    hashed_password = security.hash_password(body.password)
    is_admin = False
    if(type_user == 'admin'):
        is_admin = True
        
    # Armazenar no banco de dados
    new_user = {
        "email": body.email,
        "nome":body.nome,
        "sobrenome": body.sobrenome,
        "telephone":body.telephone,
        "password": hashed_password,
        "is_admin": is_admin
    }
    
    database.insert_user(new_user)
    return {'token': security.create_access_token(data={"email": body.email, "is_admin": is_admin})}

@router.post('/login')
def login_user(body: schemas.UserLogin):
    user = database.get_user_by_email(body.email)
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if not security.verify_password(body.password, user.password):
        raise HTTPException(status_code=401, detail="Senha incorreta")
    
    access_token = security.create_access_token(data={"email": user.email, "is_admin": user.is_admin})
    user_copy={}
    user_copy['email'] = user.email
    
    return {'userInfo': user_copy, 'token':access_token}


@router.get('/get-full-data')
def get_full_data_user(authorization: str = Header(None)):
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    access_token = security.create_access_token(data={"email": user.email, "is_admin": user.is_admin})

    user_copy = {
        'email':user.email,
        'nome': user.nome,
        'sobrenome': user.sobrenome,
        'telephone': user.telephone,
        'is_admin': user.is_admin
    }
    
    return {'user_infos': user_copy,
            'to_do': database.get_to_do_by_user(user.email),
            'token': access_token}




#rotas abaixo estao sem uso


# Rota para gerenciamento de usuários
@router.get('/manage-users', response_model=list[schemas.User])
def manage_users(token: str):
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
def update_user(user_id: int, body: schemas.UserUpdate, token: str ):
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
def delete_user(user_id: int, token: str):
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
@router.get('/details/{user_id}')
def get_user_details(user_id: int, token: str ):
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
