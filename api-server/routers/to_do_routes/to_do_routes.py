from fastapi import APIRouter, HTTPException
from database import schemas, database

router = APIRouter(prefix='/to-do')

@router.post('/add')
def add_new_to_do(to_do: schemas.To_do_list): 
    if(database.insert_new_todo(to_do)):
        return 200
    else:
        raise HTTPException(status_code=500, 
                            detail="Erro ao inserir a to_do")
    

@router.patch('/update/{id_to_do}/{status}')
def update_to_do(id_to_do: int, status: str):
    if(database.verify_id_to_exists(id_to_do)):
        if(status != 'concluido'):
            raise HTTPException(status_code=406, 
                                detail="Essa atualização de status não é aceita")
        return database.change_status_todo(status, id_to_do)
    else:
        raise HTTPException(status_code=404, 
                                detail="Não foi encontrada uma Todo com esse ID")


@router.delete('/delete/{id_to_do}')
def delete_to_do(id_to_do: int):
    if(database.verify_id_to_exists(id_to_do)):
        return database.change_status_todo('arquivada')
        
    else:
        raise HTTPException(status_code=404, 
                                detail="Não foi encontrada uma Todo com esse ID")
        
        
@router.get('/list/arquivadas')
def get_to_do_arquiveded():
    #pegar o email de quem ta pedindo
    email_requisitante = ''
    pass

#para pegar as que estao concluidas ou pendentes
@router.get('list/validas')
def get_to_do_valid():
    #pegar o email de quem ta pedindo
    email_requisitante = ''
    pass
    

#para pegar as que estao concluidas ou pendentes
@router.get('list')
def get_to_do():
    #pegar o email de quem ta pedindo
    email_requisitante = ''
    pass