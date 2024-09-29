import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.get('/exemplo')
def exemplo() -> str:
    return 'ola mundoaaa'

if __name__ == '__main__':
    uvicorn.run(app, port=8000)