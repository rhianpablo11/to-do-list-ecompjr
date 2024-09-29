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
def delete_to_do(id_to_do: int):
    if database.verify_id_to_exists(id_to_do):
        if database.change_status_todo('arquivada', id_to_do):
            return {"status": "success", "message": "To-do archived successfully"}
        else:
            raise HTTPException(status_code=500, detail="Error archiving to-do")
    else:
        raise HTTPException(status_code=404, detail="To-do not found")

        
        
@router.get('/list/arquivadas')
def get_to_do_archived():
    todos = database.get_to_dos_by_status('arquivada')
    return {"status": "success", "data": todos}


#para pegar as que estao concluidas ou pendentes
@router.get('/list/validas')
def get_to_do_valid():
    todos = database.get_to_dos_not_archived()
    return {"status": "success", "data": todos}
    

#para pegar as que estao concluidas ou pendentes
@router.get('list')
def get_to_do():
    #pegar o email de quem ta pedindo
    email_requisitante = ''
    pass