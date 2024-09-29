import sqlite3

def cria_db():
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

        incrementa(0)
    except Exception as e:
        print(e)
        
        
def get_total():
    conn = sqlite3.connect("contador.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT total FROM contador WHERE id = 1;
    """)
    linha = cursor.fetchone()
    conn.close()

    return linha[0]

def incrementa(total):
    conn = sqlite3.connect("contador.db")
    cursor = conn.cursor()

    cursor.execute(f"""
        REPLACE INTO contador (id, total) 
        VALUES (1, {total+1});
    """)
    conn.commit()
    conn.close()