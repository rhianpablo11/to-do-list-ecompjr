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
            telephone VARCHAR(20) NOT NULL,
            is_admin VARCHAR(10) NOT NULL -- Pode ser 'admin' ou 'common'
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
            INSERT INTO {TABLE_USER} (email, nome, sobrenome, password, telephone, is_admin) 
            VALUES (?, ?, ?, ?, ?, ?);
        """, (user['email'], user['nome'], user['sobrenome'], user['password'], user['telephone'], user['is_admin']))
        conn.commit()
    except sqlite3.IntegrityError:
        print(f"User with email {user['email']} already exists.")
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
def insert_new_todo(to_do: schemas.To_do_list):
    try:
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()

        cursor.execute(f"""
            INSERT INTO {TABLE_TO_DO} (create_date, description, status, user_id)
            VALUES (?, ?, ?, ?);
        """, (to_do.create_date, to_do.description, to_do.status, to_do.users))

        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(e)
        return False

# Função para alterar o status de uma tarefa
def change_status_todo(status: str, to_do_id: int) -> bool:
    try:
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()

        cursor.execute(f"""
            UPDATE {TABLE_TO_DO} 
            SET status = ?
            WHERE task_id = ?
        """, (status, to_do_id))

        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error updating to-do status: {e}")
        return False


# Função para pegar as tarefas de um usuário baseado no email
def get_to_do_by_user(user_email: str) -> list:
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT t.task_id, t.create_date, t.description, t.status
        FROM {TABLE_TO_DO} t
        JOIN {TABLE_USER} u ON t.user_id = u.email
        WHERE u.email = ?;
    """, (user_email,))
    
    tarefas = cursor.fetchall()
    conn.close()
    
    return [{"task_id": t[0], "create_date": t[1], "description": t[2], "status": t[3]} for t in tarefas]


# Função para verificar se um to-do com o ID fornecido existe
def verify_id_to_exists(id_to_do: int) -> bool:
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT task_id FROM {TABLE_TO_DO} WHERE task_id = ?
    """, (id_to_do,))
    
    result = cursor.fetchone()
    conn.close()
    
    return result is not None


# Função para obter os dados do usuário logado (com base no email)
def get_user_by_email(email: str) -> schemas.UserLogged:
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT email, nome, sobrenome, telephone, is_admin, password, user_id 
        FROM {TABLE_USER} 
        WHERE email = ?;
    """, (email,))
    
    linha = cursor.fetchone()
    conn.close()

    if linha:
        return schemas.UserOut(
            email=linha[0], 
            nome=linha[1], 
            sobrenome=linha[2], 
            telephone=linha[3],
            is_admin=linha[4],
            password=linha[5],
            user_id=linha[6]
        )
    return None

# Função para obter as tarefas de acordo com o status (auxiliar nas rotas de listagem)
def get_to_dos_by_status(status: str) -> list:
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT task_id, create_date, description, status 
        FROM {TABLE_TO_DO} 
        WHERE status = ?;
    """, (status,))
    
    todos = cursor.fetchall()
    conn.close()
    return [{"task_id": t[0], "create_date": t[1], "description": t[2], "status": t[3]} for t in todos]

# Função para obter as tarefas que não estão arquivadas
def get_to_dos_not_archived() -> list:
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT task_id, create_date, description, status 
        FROM {TABLE_TO_DO} 
        WHERE status != 'arquivada';
    """)
    
    todos = cursor.fetchall()
    conn.close()
    return [{"task_id": t[0], "create_date": t[1], "description": t[2], "status": t[3]} for t in todos]


def get_all_users() -> list:
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Selecionar todos os usuários no banco de dados
    cursor.execute(f"""
        SELECT email, nome, sobrenome, telephone, is_admin 
        FROM {TABLE_USER};
    """)

    users = cursor.fetchall()
    conn.close()

    # Retornar os usuários com 'password' como 'null'
    return [{
        "email": user[0],
        "nome": user[1],
        "sobrenome": user[2],
        "password": None,  # Password null
        "telephone": user[3],
        "is_admin": user[4]
    } for user in users]
