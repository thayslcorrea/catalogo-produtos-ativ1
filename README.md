## Pré-requisitos

* Docker & Docker Compose instalados
* Node.js (v18+ recomendado)
* npm (vem junto com Node.js)
* Insomnia ou Postman (opcional, para testar endpoints)

---

## 1. Clonar o repositório

```bash
git clone https://github.com/thayslcorrea/catalogo-produtos-ativ1.git
cd catalogo-produtos-ativ1
```

---

## 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```
---

## 3. Subir o container do PostgreSQL

```bash
docker compose up -d
docker ps
```
---

## 4. Instalar dependências do projeto

```bash
npm install
```

---

## 5. Criar o banco de dados (caso não exista)

```bash
docker ps  # veja o nome do container, ex: catalogo-produtos-db-1
docker exec -it <NOME_CONTAINER> psql -U postgres
```

Dentro do SQL:
```bash
CREATE DATABASE catalogo_db;
\q
```

---

## 6. Rodar migrations do Prisma

```bash
npx prisma migrate dev --name init
```

---

## 7. Popular banco com seed

```bash
npm run seed
```

---

## 8. Popular banco com seed

```bash
npm run dev
```

---

## 9. Endpoints disponíveis e status HTTP esperados

GET     /	            -   Status da API	            -   200 OK
GET	    /products	    -   Lista todos os produtos	    -   200 OK
GET	    /products/:id	- Retorna produto por ID	    - 200 OK / 404 Not Found
DELETE	/products/:id	- Remove um produto	            204 No Content / 404  Not Found

POST	/products	    - Cria um produto	            - 201 Created / 400 Bad Request	
Payload de exemplo: { "title": "Caneta", "description": "Azul", "price": 2.5 }

PUT	    /products/:id	- Atualiza um produto	        - 200 OK / 400 / 404	
Payload de exemplo: { "title": "Caneta", "description": "Vermelha", "price": 3.0 }

Possíveis status de erro adicionais:
500 Internal Server Error → quando ocorre falha no servidor ou no banco de dados.