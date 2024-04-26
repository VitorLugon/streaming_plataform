
# Plataforma de Streaming API 

Esta é uma API backend para uma plataforma de streaming desenvolvida com Node.js, Express e MongoDB.

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/VitorLugon/plataforma-streaming_plataform.git
```

2. Instale as dependências:

```bash
cd plataforma-streaming-api
npm install
```

3. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env`
   - Edite o arquivo `.env` e adicione suas configurações, como a URL do banco de dados MongoDB.

4. Inicie o servidor:

```bash
npm run dev
```

## Rotas

### Autenticação

- `POST /api/users/auth`
  - Autentica um usuário existente
  - Payload:
    ```json
    {
      "email": "email@example.com",
      "password": "senha123"
    }
    ```
  - Retorna um token de acesso JWT

- `POST /api/users`
  - Registra um novo usuário
  - Payload:
    ```json
    {
      "name": "Nome do Usuário",
      "email": "email@example.com",
      "password": "senha123"
    }
    ```
  - Retorna um token de acesso JWT

- `POST /api/users/logout`
  - Faz logout do usuário
  - Requer autenticação JWT no cabeçalho `Authorization`

### Perfil do Usuário

- `GET /api/users/profile`
  - Obtém o perfil do usuário autenticado
  - Requer autenticação JWT no cabeçalho `Authorization`

- `PUT /api/users/profile`
  - Atualiza o perfil do usuário autenticado
  - Requer autenticação JWT no cabeçalho `Authorization`
  - Payload:
    ```json
    {
      "name": "Novo Nome",
      "email": "novoemail@example.com",
      "password": "novasenha123"
    }
    ```

### Assinantes (Subscribers)

- `GET /api/subscribers`
  - Obtém todos os assinantes

- `GET /api/subscribers/:id`
  - Obtém detalhes de um assinante específico pelo ID

- `POST /api/subscribers`
  - Adiciona um novo assinante
  - Payload:
    ```json
    {
      "name": "Nome do Assinante",
      "subscribedToChannel": "Canal Subscrito"
    }
    ```

- `PATCH /api/subscribers/:id`
  - Atualiza os detalhes de um assinante existente pelo ID
  - Payload (opcional):
    ```json
    {
      "name": "Novo Nome",
      "subscribedToChannel": "Novo Canal Subscrito"
    }
    ```

- `DELETE /api/subscribers/:id`
  - Remove um assinante existente pelo ID

## Contribuindo

Se você quiser contribuir com este projeto, sinta-se à vontade para abrir um pull request ou criar uma issue para discutir novos recursos, correções de bugs, etc.

