from database import schemas
import sqlite3


#variaveis c os nomes das tabelas
TABLE_USER = ''
TABLE_TO_DO = 'to_do_list_table'


#função para criar uma tabela no banco
def create_db_user():
    try:
        conn = sqlite3.connect(TABLE_USER)
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE contador (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                total INTEGER    
            );
        """)
        conn.close()
    except Exception as e:
        print(e)
        
        
#estilo de função para att os dados/inserir
def incrementa(total):
    conn = sqlite3.connect("contador.db")
    cursor = conn.cursor()

    cursor.execute(f"""
        REPLACE INTO contador (id, total) 
        VALUES (1, {total+1});
    """)
    conn.commit()
    conn.close()
    

#estilo de função para leitura dos dados
def get_total():
    conn = sqlite3.connect("contador.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT total FROM contador WHERE id = 1;
    """)
    linha = cursor.fetchone()
    conn.close()
    return linha[0]


def verify_email_existance(email) -> bool:
    conn = sqlite3.connect(TABLE_USER)
    cursor = conn.cursor()
    cursor.execute("SELECT email FROM TABLE_USER where email = ?", (email,))
    linha = cursor.fetchone()
    conn.close()
    if linha:
        return True
    return False


def get_user() -> schemas.UserLogged:
    pass


#inserir uma nova todo
def insert_new_todo() -> schemas.To_do_list:
    pass


#alterar o status daquela todo
def change_status_todo(status: str, to_do_id: int) -> schemas.To_do_list:
    pass
 
#pegar as todos daquele usuario
def get_to_do_by_user(user_email: str) -> list:
    pass


def verify_id_to_exists(id_to_to: int) -> bool:
    pass


def create_tables():
    create_db_user()
    return True