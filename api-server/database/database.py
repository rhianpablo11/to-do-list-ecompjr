import sqlite3


#função para criar uma tabela no banco
def create_db_user():
    try:
        conn = sqlite3.connect("contador.db")
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



def create_tables():
    create_db_user()
    return True