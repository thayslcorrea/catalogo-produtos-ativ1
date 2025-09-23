# Catálogo de Produtos - Node.js + TypeScript + Express + PostgreSQL (Docker) + Prisma

A explicação em vídeo: https://drive.google.com/file/d/1WhOiNwdEV3DSPVgP6CzVQt6551dOjfHE/view?usp=sharing

## Pré-requisitos

* Docker & Docker Compose instalados
* Node.js (v18+ recomendado)
* npm (vem junto com Node.js)

---

## 1. Clonar o repositório

```bash
git clone https://github.com/thayslcorrea/catalogo-produtos-ativ1
cd catalogo-produtos-ativ1
```

---

## 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e edite se necessário:

```bash
cp .env.example .env
```

Conteúdo do `.env`:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=catalogo_db
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/catalogo_db?schema=public
PORT=3333
```

---

## 3. Subir o container do PostgreSQL

```bash
docker compose up -d
```

Verifique se o container está rodando:

```bash
docker ps
```

> Observação: remova `version:` do `docker-compose.yml` se estiver presente.

---

## 4. Instalar dependências do projeto

```bash
npm install
```

---

## 5. Criar o banco de dados (caso não exista)

Entre no container:

```bash
docker ps  # veja o nome do container, ex: catalogo-produtos-db-1
```

```bash
docker exec -it <NOME_CONTAINER> psql -U postgres
```

Dentro do psql:

```sql
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

## 8. Rodar servidor Express

```bash
npm run dev
```

O servidor vai rodar em: `http://localhost:3333`

---

## 9. Endpoints disponíveis

* **GET /** → status da API
* **GET /products** → lista todos produtos
* **GET /products/\:id** → retorna produto por id
* **POST /products** → cria um produto

Exemplo de GET de todos produtos com curl:

```bash
curl http://localhost:3333/products
```

---

## 10. Testando com Insomnia

Crie requisições:

* GET `/`
* GET `/products`
* GET `/products/1`
* POST `/products` (JSON com `title`, `description`, `price`)

---

## 11. Prisma Studio

Para visualizar os dados no banco:

```bash
npx prisma studio
```
