from pydantic.main import BaseModel
from datetime import date, datetime


class User(BaseModel):
    email: str
    nome: str
    sobrenome: str
    password: str
    telephone: str
    is_admin: bool
    
class Admin(User):
    is_admin: bool

class UserUpdate(BaseModel):
    tipo_usuario: str  
    
    
class To_do_list(BaseModel):
    description: str
    status: str
    users: str
    create_date: date
    

class UserLogged(BaseModel):
    email: str
    nome: str
    sobrenome: str
    telephone: str
    is_admin: bool
    
    
class UserLogin(BaseModel):
    email: str
    password: str