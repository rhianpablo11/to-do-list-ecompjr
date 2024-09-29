from jose import jwt, JWTError
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from decouple import config

SECRET

def login_user(expires_in: 30):
    # realizar validacao
    #vericar email
    if none:
        raise HTTPException(status_code = HTTP_401_UNAUTHORIZED,
                            detail = 'invalid username or password'
                            )

    #verificar senha
    if none:
        raise HTTPException(status_code = HTTP_401_UNAUTHORIZED,
                            detail = 'invalid username or password'
                            )

    exp = datetime.utcnow() + timedelta(minutes= expires_in)
    payload = {
        'user': 'email_user',
        'exp': exp
    }