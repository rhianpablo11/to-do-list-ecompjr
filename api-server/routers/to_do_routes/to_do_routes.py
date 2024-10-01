from fastapi import APIRouter, HTTPException, Depends, Header
from database import schemas, database, security
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter(prefix='/to-do')

@router.post('/add')
def add_new_to_do(to_do: schemas.To_do_list, authorization: str = Header(None)): 
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    
    
    
    if(database.insert_new_todo(to_do)):
        return 200
    else:
        raise HTTPException(status_code=500, 
                            detail="Erro ao inserir a to_do")
    

@router.patch('/update/{id_to_do}/{status}')
def update_to_do(id_to_do: int, status: str, authorization: str = Header(None)):
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    
    
    if database.verify_id_to_exists(id_to_do):
        if status != 'concluido':
            raise HTTPException(status_code=406, detail="Status update not accepted")
        
        if database.change_status_todo(status, id_to_do):
            return {"status": "success", "message": "To-do status updated"}
        else:
            raise HTTPException(status_code=500, detail="Error updating status")
    else:
        raise HTTPException(status_code=404, detail="To-do not found")



@router.delete('/delete/{id_to_do}')
def delete_to_do(id_to_do: int, authorization: str = Header(None)):
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    
    
    if database.verify_id_to_exists(id_to_do):
        if database.change_status_todo('arquivada', id_to_do):
            return {"status": "success", "message": "To-do archived successfully"}
        else:
            raise HTTPException(status_code=500, detail="Error archiving to-do")
    else:
        raise HTTPException(status_code=404, detail="To-do not found")

        
        
@router.get('/list/arquivadas')
def get_to_do_archived(authorization: str = Header(None)):
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    
    todos = database.get_to_dos_by_status('arquivada')
    return {"status": "success", "data": todos}


#para pegar as que estao concluidas ou pendentes
@router.get('/list/validas')
def get_to_do_valid(authorization: str = Header(None)):
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    
    
    todos = database.get_to_dos_not_archived()
    return {"status": "success", "data": todos}
    




#Rotas do ADM


# Rota para listar todos os usuários
@router.get('/list-users')
def list_users(authorization: str = Header(None)):
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if(not user['is_admin']):
        raise HTTPException(status_code=403, detail="Acesso invalido")
    
    
    users = database.get_all_users()
    if users:
        return {"status": "success", "data": users}
    else:
        raise HTTPException(status_code=404, detail="Nenhum usuário encontrado")



# Rota para remover um usuário
@router.delete('/delete-user/{user_id}')
def delete_user(user_id, authorization: str = Header(None)):
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    if(not user['is_admin']):
        raise HTTPException(status_code=403, detail="Acesso invalido")
    
    
    if database.verify_user_exists(user_id):
        if database.delete_user(user_id):
            return {"status": "success", "message": "Usuário deletado com sucesso"}
        else:
            raise HTTPException(status_code=500, detail="Erro ao deletar o usuário")
    else:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")




# Rota para atualizar um usuário (ex: mudar tipo de usuário)
@router.patch('/update-user/{user_id}')
def update_user(user_id: int, updated_user: schemas.UserUpdate, authorization: str = Header(None)):
    payload = security.decode_token(authorization)
    if(payload == None):
        raise HTTPException(status_code=403, detail="Token inválido ou expirado")
    
    user = database.get_user_by_email(payload['email'])
    if(user == None):
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if(not user['is_admin']):
        raise HTTPException(status_code=403, detail="Acesso invalido")
    
    
    if database.verify_user_exists(user_id):
        if database.update_user_info(user_id, updated_user):
            return {"status": "success", "message": "Usuário atualizado com sucesso"}
        else:
            raise HTTPException(status_code=500, detail="Erro ao atualizar o usuário")
    else:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")