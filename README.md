
# Sistema de Gerenciamento de Tarefas (To-Do List) - Documentação do Projeto

## Visão Geral

Este projeto é um **Sistema de Gerenciamento de Tarefas (To-Do List)** desenvolvido para gerenciar tarefas com diferentes papéis de usuários, incluindo **administradores** que têm acesso especial para gerenciar outros usuários. O sistema é construído com **FastAPI** no back-end, utilizando **SQLite** como banco de dados, e segue uma estrutura modular que garante escalabilidade e fácil manutenção.

O projeto implementa funcionalidades-chave, como **registro de usuários, autenticação**, gerenciamento de tarefas e diferenciação de papéis de usuários (administradores e usuários comuns). Administradores podem realizar tarefas adicionais, como gerenciamento de outros usuários, enquanto os usuários comuns podem criar, atualizar e arquivar suas próprias tarefas. O sistema também permite o **gerenciamento do status das tarefas** (por exemplo, pendente, concluída, arquivada).


### Como executar o projeto


### 1. Realizar o download do projeto 
  O download pode ser feito via clone do repositório executando o seguinte comando no terminal:

``` bash
git clone https://github.com/rhianpablo11/distributed-banking-system-TEC502.git
```

### 2. Acesse a pasta do projeto no terminal

### 3. Realize a instalação das dependencias
#### 3.1 Dependencias do servidor
Para realizar a instalação copie e cole o seguinte codigo no terminal
``` bash
pip install -r requirements.txt
```
#### 3.2 Dependencias da interface
1. Acesse a pasta da interface
``` bash
cd to-do-list-interface/
```
2. Execute o seguinte comando para instalar os modulos
``` bash
npm install
```

### 4. Acesse a pasta "api-server"
1. Execute o seguinte comando para iniciar o servidor
``` bash
uvicorn main:app
```
### 5. Inicie outra instacia do terminal
1. Acesse a pasta do projeto
2. Acesse a pasta da interface com  o comando abaixo
``` bash
cd to-do-list-interface/
``` 
1. Execute o seguinte comando para iniciar a interface
``` bash
npm run serve
``` 

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

- **`POST /user/cadastro/common`**: Registra um novo usuário.
    - Parâmetros: `email`, `password`, `nome`, `sobrenome`, `telephone`, `is_admin`
    - Exemplo:
      ```json
      {
        "email": "usuario@example.com",
        "password": "senhasegura",
        "nome": "João",
        "sobrenome": "Silva",
        "telephone": "+551199999999",
        "is_admin": false
      }
      ```
    - Resposta: `201 Created` em caso de sucesso.
  - **`POST /user/cadastro/admin`**: Registra um novo administrador.
    - Parâmetros: `email`, `password`, `nome`, `sobrenome`, `telephone`, `is_admin`
    - Exemplo:
      ```json
      {
        "email": "usuario@example.com",
        "password": "senhasegura",
        "nome": "João",
        "sobrenome": "Silva",
        "telephone": "+551199999999",
        "is_admin": true
      }
      ```
    - Resposta: `201 Created` em caso de sucesso.

- **`POST /user/login`**: Faz login do usuário e retorna um token JWT.
    - Parâmetros: `email`, `password`
    - Exemplo:
      ```json
      {
        "email": "usuario@example.com",
        "password": "senhasegura"
      }
      ```
    - Resposta: `200 OK` com token.

- **`GET /users/get-full-data`**: Retorna os detalhes do usuário autenticado.

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



---

## Gerenciamento de Papéis de Usuário

Para suportar o **controle de acesso baseado em papéis (RBAC)**, administradores têm privilégios especiais no sistema.

### Rotas Exclusivas para Administradores:

- **`GET /user/manage-users`**: Lista todos os usuários.


### Verificação de Papel

Para o gerenciamento de papéis, uma coluna especial `is_admin` é usada na tabela `users` para indicar se um usuário é administrador. Esse atributo do usuario é utilizado pelo codigo presente na interface com o fim de liberar acesso a determinadas paginas, e funcionalidades. Para o caso do administrador, este pode acessar a pagina de gerenciamento de usuários em adição as funcionalidades do usuário comum.

---

## Segurança

- **Hash de Senhas**: Todas as senhas dos usuários são criptografadas antes de serem armazenadas no banco de dados, garantindo uma autenticação segura.
- **Autenticação JWT**: Há algumas rotas que requerem autenticação utilizam tokens JWT para garantir uma gestão segura de sessões.
- **Controle de Acesso Baseado em Papéis**: Rotas de administrador são protegidas por verificações que garantem que apenas usuários com o papel de administrador possam acessá-las.

---

## Melhorias Futuras

- **Atribuição de Tarefas**: Implementar a capacidade de atribuir tarefas a outros usuários.
- **Notificações de Tarefas**: Notificar usuários sobre atualizações ou prazos de tarefas.
- **Registro de Auditoria**: Manter um log das alterações feitas pelos administradores.
- **Tarefas atribuidas a mais de um usuário**: Permitir que um usuário crie uma tarefa e atribua ela a outros usuários, para além dele.

---

