from database import schemas
import sqlite3
from datetime import date

# Variáveis com os nomes das tabelas
TABLE_USER = 'users'
TABLE_TO_DO = 'to_do_list'

# Função para criar as tabelas no banco de dados
def create_tables():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Criar tabela de usuários
    cursor.execute(f"""
        CREATE TABLE IF NOT EXISTS {TABLE_USER} (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(255) UNIQUE NOT NULL,
            nome VARCHAR(100) NOT NULL,
            sobrenome VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            telephone VARCHAR(20) NOT NULL
        );
    """)

    # Criar tabela de to-do list
    cursor.execute(f"""
        CREATE TABLE IF NOT EXISTS {TABLE_TO_DO} (
            task_id INTEGER PRIMARY KEY AUTOINCREMENT,
            create_date DATE NOT NULL,
            description TEXT NOT NULL,
            status VARCHAR(50) NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES {TABLE_USER}(user_id)
        );
    """)

    conn.commit()
    conn.close()

# Função para inserir um novo usuário
def insert_user(user: schemas.User):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        cursor.execute(f"""
            INSERT INTO {TABLE_USER} (email, nome, sobrenome, password, telephone) 
            VALUES (?, ?, ?, ?, ?);
        """, (user.email, user.nome, user.sobrenome, user.password, user.telephone))
        conn.commit()
    except sqlite3.IntegrityError:
        print(f"User with email {user.email} already exists.")
    finally:
        conn.close()

# Função para verificar a existência de um email
def verify_email_existence(email: str) -> bool:
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT email FROM {TABLE_USER} WHERE email = ?", (email,))
    linha = cursor.fetchone()
    conn.close()
    return linha is not None

# Função para inserir uma nova tarefa (to-do)
def insert_new_todo(todo: schemas.To_do_list):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(f"""
        INSERT INTO {TABLE_TO_DO} (create_date, description, status, user_id)
        VALUES (?, ?, ?, ?);
    """, (todo.create_date, todo.description, todo.status, todo.users[0]))
    
    conn.commit()
    conn.close()

# Função para alterar o status de uma tarefa
def change_status_todo(status: str, task_id: int):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(f"""
        UPDATE {TABLE_TO_DO} 
        SET status = ? 
        WHERE task_id = ?;
    """, (status, task_id))

    conn.commit()
    conn.close()

# Função para pegar as tarefas de um usuário baseado no email
def get_to_do_by_user(user_email: str) -> list:
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT t.task_id, t.create_date, t.description, t.status
        FROM {TABLE_TO_DO} t
        JOIN {TABLE_USER} u ON t.user_id = u.user_id
        WHERE u.email = ?;
    """, (user_email,))
    
    tarefas = cursor.fetchall()
    conn.close()
    
    return [{"task_id": t[0], "create_date": t[1], "description": t[2], "status": t[3]} for t in tarefas]


def verify_id_to_exists(id_to_to: int) -> bool:
    pass


# Função para obter os dados do usuário logado (com base no email)
def get_user(email: str) -> schemas.UserLogged:
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT email, nome, sobrenome, telephone 
        FROM {TABLE_USER} 
        WHERE email = ?;
    """, (email,))
    
    linha = cursor.fetchone()
    conn.close()

    if linha:
        return schemas.UserLogged(
            email=linha[0], 
            nome=linha[1], 
            sobrenome=linha[2], 
            telephone=linha[3]
        )
    return None

# Exemplo de uso da função para criar as tabelas
if __name__ == "__main__":
    create_tables()

    # Exemplo de como adicionar um usuário
    new_user = schemas.User(
        email="example@example.com", 
        nome="John", 
        sobrenome="Doe", 
        password="123456", 
        telephone="123456789"
    )
    insert_user(new_user)

    # Verificando se o usuário foi adicionado
    exists = verify_email_existence("example@example.com")
    print(f"User exists: {exists}")

    # Exemplo de como inserir uma nova tarefa
    new_todo = schemas.To_do_list(
        create_date=date.today(), 
        description="Finalizar projeto", 
        status="Pendente", 
        users=[1]  # Assumindo que o user_id 1 já existe
    )
    insert_new_todo(new_todo)

    # Mudando o status de uma tarefa
    change_status_todo("Concluído", 1)

    # Obtendo todas as tarefas de um usuário
    tarefas = get_to_do_by_user("example@example.com")
    print("Tarefas do usuário:", tarefas)
