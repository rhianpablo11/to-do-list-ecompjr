from pydantic.main import BaseModel
from datetime import date


class User(BaseModel):
    email: str
    nome: str
    sobrenome: str
    password: str
    telephone: str
    
class Admin(User):
    is_admin: bool
    
    
class To_do_list(BaseModel):
    description: str
    status: str
    users: list
    

class UserLogged(BaseModel):
    email: str
    nome: str
    sobrenome: str
    telephone: str
    
    