
# Sistema de Gerenciamento de Tarefas (To-Do List) - Documentação do Projeto

## Visão Geral

Este projeto é um **Sistema de Gerenciamento de Tarefas (To-Do List)** desenvolvido para gerenciar tarefas com diferentes papéis de usuários, incluindo **administradores** que têm acesso especial para gerenciar outros usuários. O sistema é construído com **FastAPI** no back-end, utilizando **SQLite** como banco de dados, e segue uma estrutura modular que garante escalabilidade e fácil manutenção.

O projeto implementa funcionalidades-chave, como **registro de usuários, autenticação**, gerenciamento de tarefas e diferenciação de papéis de usuários (administradores e usuários comuns). Administradores podem realizar tarefas adicionais, como gerenciamento de outros usuários, enquanto os usuários comuns podem criar, atualizar e arquivar suas próprias tarefas. O sistema também permite o **gerenciamento do status das tarefas** (por exemplo, pendente, concluída, arquivada).

### Tecnologias Utilizadas

- **Back-end**: FastAPI
- **Banco de Dados**: SQLite
- **Autenticação**: Baseada em token (JWT)


---

## Funcionalidades Principais

1. **Gerenciamento de Usuários**:
   - **Registro de Usuários**: Novos usuários podem se registrar informando email, senha e dados pessoais.
   - **Login e Autenticação**: Usuários podem fazer login com suas credenciais, recebendo um token JWT que garante acesso seguro.
   - **Papel de Administrador**: Administradores têm privilégios adicionais, como gerenciar outros usuários e tarefas.
   - **Criptografia de Senha**: As senhas dos usuários são armazenadas de forma segura usando hashing.

2. **Gerenciamento de Tarefas (To-Do List)**:
   - **Criação de Nova Tarefa**: Usuários podem criar novas tarefas com uma descrição e status inicial.
   - **Atualização de Status da Tarefa**: As tarefas podem ser marcadas como 'concluídas', e os administradores podem arquivá-las.
   - **Arquivar Tarefas**: Em vez de excluir, as tarefas podem ser arquivadas, tornando-se inativas, mas ainda visíveis para fins administrativos.
   - **Visualização por Status**: As tarefas podem ser filtradas por status, como 'pendente', 'concluída' ou 'arquivada'.

3. **Funcionalidade Administrativa**:
   - **Verificação de Papel de Usuário**: Administradores podem gerenciar os papéis e permissões de outros usuários. Apenas administradores podem realizar tarefas relacionadas à gestão de usuários.
   - **Gerenciamento de Tarefas pelos Administradores**: Administradores têm acesso a todas as tarefas do sistema, independentemente do dono da tarefa.
   - **Listagem e Filtragem**: Administradores podem listar tarefas por diversos critérios, como por status ou por usuário.

---
## Interface do Usuário

A interface do sistema foi desenhada utilizando **Figma**. Abaixo estão algumas das telas desenvolvidas:

### Tela Principal
![Tela de Login](https://github.com/rhianpablo11/to-do-list-ecompjr/raw/main/readme-images/home_todolist.png)

### Tela de Listagem de tarefas
![Tela de Gerenciamento de Tarefas](https://github.com/rhianpablo11/to-do-list-ecompjr/raw/main/readme-images/to-dolist.png)

---

## Diagrama de Classes

O diagrama de classes a seguir descreve a estrutura de dados e relacionamentos principais do sistema, incluindo as entidades de usuários e tarefas.

![Diagrama de Classes](https://github.com/rhianpablo11/to-do-list-ecompjr/raw/main/readme-images/diagrama.png)

---
## Esquema de Banco de Dados

### Tabelas

1. **Tabela de Usuários**:
   - `user_id`: Chave primária auto-incrementada.
   - `email`: Endereço de email único para cada usuário.
   - `nome`: Primeiro nome do usuário.
   - `sobrenome`: Sobrenome do usuário.
   - `password`: Senha criptografada (hash).
   - `telephone`: Número de telefone do usuário.
   - `is_admin`: Flag booleano indicando se o usuário é administrador.

2. **Tabela de Tarefas (To-Do List)**:
   - `task_id`: Chave primária auto-incrementada para as tarefas.
   - `create_date`: Data em que a tarefa foi criada.
   - `description`: Descrição da tarefa.
   - `status`: Status atual da tarefa (por exemplo, pendente, concluída, arquivada).
   - `user_id`: Chave estrangeira vinculada ao usuário que criou a tarefa.

---

## Endpoints da API

### **Rotas de Usuários**:

- **`POST /users/register`**: Registra um novo usuário.
    - Parâmetros: `email`, `password`, `nome`, `sobrenome`, `telephone`
    - Exemplo:
      ```json
      {
        "email": "usuario@example.com",
        "password": "senhasegura",
        "nome": "João",
        "sobrenome": "Silva",
        "telephone": "+551199999999"
      }
      ```
    - Resposta: `201 Created` em caso de sucesso.

- **`POST /users/login`**: Faz login do usuário e retorna um token JWT.
    - Parâmetros: `email`, `password`
    - Exemplo:
      ```json
      {
        "email": "usuario@example.com",
        "password": "senhasegura"
      }
      ```
    - Resposta: `200 OK` com token.

- **`GET /users/me`**: Retorna os detalhes do usuário autenticado.

### **Rotas de Tarefas (To-Do)**:

- **`POST /to-do/add`**: Cria uma nova tarefa (to-do).
    - Parâmetros: `create_date`, `description`, `status`, `user_id`
    - Exemplo:
      ```json
      {
        "create_date": "2024-09-30",
        "description": "Finalizar documentação do projeto",
        "status": "pendente",
        "user_id": 1
      }
      ```

- **`PATCH /to-do/update/{id_to_do}/{status}`**: Atualiza o status de uma tarefa (por exemplo, marcar como concluída).
    - Parâmetros na URL: `id_to_do`, `status`
    - Resposta: `200 OK` em caso de sucesso.

- **`DELETE /to-do/delete/{id_to_do}`**: Arquiva uma tarefa (soft delete).
    - Parâmetros na URL: `id_to_do`
    - Resposta: `200 OK` em caso de sucesso.

- **`GET /to-do/list/arquivadas`**: Retorna todas as tarefas arquivadas.

- **`GET /to-do/list/validas`**: Retorna todas as tarefas que não estão arquivadas.

---

## Gerenciamento de Papéis de Usuário

Para suportar o **controle de acesso baseado em papéis (RBAC)**, administradores têm privilégios especiais no sistema.

### Rotas Exclusivas para Administradores:

- **`GET /admin/users`**: Lista todos os usuários (somente administradores).
- **`PATCH /admin/users/{user_id}/promote`**: Promove um usuário comum a administrador.
    - Parâmetros: `user_id`
    - Resposta: `200 OK` em caso de sucesso.

- **`DELETE /admin/users/{user_id}`**: Desativa a conta de um usuário (somente administradores).

### Verificação de Papel

Para o gerenciamento de papéis, uma coluna especial `is_admin` é usada na tabela `users` para indicar se um usuário é administrador. A função `is_user_admin(email: str)` é utilizada para verificar se um usuário tem privilégios administrativos antes de acessar rotas protegidas.

```python
def is_user_admin(email: str) -> bool:
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT is_admin 
        FROM users 
        WHERE email = ?;
    """, (email,))
    
    result = cursor.fetchone()
    conn.close()

    return result and result[0] == 1
```

---

## Segurança

- **Hash de Senhas**: Todas as senhas dos usuários são criptografadas antes de serem armazenadas no banco de dados, garantindo uma autenticação segura.
- **Autenticação JWT**: Todas as rotas que requerem autenticação utilizam tokens JWT para garantir uma gestão segura de sessões.
- **Controle de Acesso Baseado em Papéis**: Rotas de administrador são protegidas por verificações que garantem que apenas usuários com o papel de administrador possam acessá-las.

---

## Melhorias Futuras

- **Atribuição de Tarefas**: Implementar a capacidade de atribuir tarefas a outros usuários.
- **Notificações de Tarefas**: Notificar usuários sobre atualizações ou prazos de tarefas.
- **Registro de Auditoria**: Manter um log das alterações feitas pelos administradores.

---

