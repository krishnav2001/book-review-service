# Book Review Service

A RESTful API for managing books and their reviews, built with **TypeScript**, **Express**, **TypeORM**, **SQLite/PostgreSQL**, and **Redis** (for caching).

## Features

- **CRUD for Books**: Add and list books.
- **Reviews**: Add and list reviews for books.
- **Caching**: Uses Redis to cache book listings.
- **Swagger/OpenAPI**: API documentation available.
- **Automated Tests**: Unit and integration tests included.

---

## Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (v8+)
- **Redis** (for caching; optional but recommended)
- **PostgreSQL** or **SQLite** (default config uses PostgreSQL, but can be adapted for SQLite)

---

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd book-review-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory with the following (example for PostgreSQL):

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=book_review
   TEST_DB_NAME=book_review_test
   REDIS_URL=redis://localhost:6379
   ```

   > For SQLite, adjust the `type` and `database` fields in `src/config/data-source.ts`.

---

## Running the Service

- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```

- **Production mode:**
  ```bash
  npm start
  ```

- The server will run on [http://localhost:5000](http://localhost:5000) by default.

---

## Database Migrations

- **Automatic Sync:**  
  The service uses TypeORM's `synchronize: true` option, so tables are auto-created/updated based on models.  
  > **Note:** For production, consider using TypeORM migrations instead of `synchronize: true`.

- **Manual Migration (if you add migration scripts):**
  ```bash
  npx typeorm migration:run
  ```

---

## API Documentation

- Swagger UI is available at:  
  [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## Running Tests

- **Unit & Integration Tests:**
  ```bash
  npm test
  ```

  - Tests are located in `src/tests/`.
  - Includes unit tests for endpoints and an integration test for cache-miss path.

---

## Caching & Error Handling

- The `/books` endpoint first attempts to read from Redis cache.
- On cache miss, it fetches from the database and populates the cache.
- If Redis is down, the service logs a warning and continues to serve data from the database.

---

## Project Structure

```
src/
  app.ts                # Express app setup
  server.ts             # Entry point
  config/               # Configurations (DB, Redis, Swagger)
  controllers/          # Route handlers
  models/               # TypeORM entities
  routes/               # API route definitions
  tests/                # Automated tests
```

---

## Notes

- **Indexing:**  
  The `Review` entity uses an index on the `book` field for optimized queries.

- **Extending:**  
  For production, set `synchronize: false` and use TypeORM migrations.

---

## License

MIT 