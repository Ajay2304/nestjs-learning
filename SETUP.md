# AjOne Monorepo Setup Guide

Welcome to the **AjOne** project setup guide. Follow these steps to get your monorepo development environment running locally.

---

## 🛠 Prerequisites

Before starting, ensure you have **pnpm** installed globally.

1. **Install pnpm**
   ```
   npm install -g pnpm
   ```

2. **Verify the installation**
   ```
   pnpm --version
   ```

---

## 🚀 Step 1: Create a NestJS Project

Generate the initial NestJS workspace:

```
nest new AjOne
```
> **Note:** When prompted to select a package manager, choose `pnpm`.

Move into the project directory and install initial dependencies:
```
cd AjOne
pnpm install
```

---

## 🏗 Step 2: Convert the Project into a Monorepo

We will use NestJS's monorepo structure to house both our API and other modules.

1. **Generate the API application:**
   ```
   nest generate app api
   ```
   This restructures the project to create an `apps/` directory containing your `api`.

2. **Verify the API application:**
   ```
   pnpm run start:dev api
   ```
   *The server should start successfully. Open [http://localhost:3000](http://localhost:3000) in your browser.*

---

## 🗄 Step 3: Create the Database Library

Generate a shared database library that can be reused across your monorepo:

```
nest generate library database
```
> **Note:** When prompted for the library prefix, choose `@app`.

This creates a `libs/database/` directory for your shared models and connections.

---

## 🐘 Step 4: Install PostgreSQL Dependencies

Install the necessary ORM and database driver packages:

```
pnpm add @nestjs/typeorm typeorm pg
```

---

## ⚙️ Step 5: Install Configuration Module

Install the NestJS configuration package for managing environment variables securely:

```
pnpm add @nestjs/config
```

---

## ⚛️ Step 6: Create the Frontend Application

We will use **React** and **Vite** for a fast frontend build tool.

1. **Create the web app inside `apps/`:**
   ```
   pnpm create vite apps/web --template react-ts
   ```

2. **Install frontend dependencies:**
   ```
   cd apps/web
   pnpm install
   cd ../..
   ```

---

## 🏃 Step 7: Running the Application

To run the frontend and backend together easily, we use the `concurrently` package.

1. **Install concurrently** as a dev dependency:
   ```
   pnpm install -D concurrently
   ```

2. **Update your root `package.json`** scripts by adding the following:
   ```json
   "scripts": {
     // ... existing scripts
     "start:api": "nest start api --watch",
     "start:web": "npm run dev --prefix apps/web",
     "start:all": "concurrently \"pnpm run start:api\" \"pnpm run start:web\""
   }
   ```

3. **Run your scripts:**

- **Run Backend API only:**
  ```
  pnpm run start:api
  ```
- **Run Frontend Web only:**
  ```
  pnpm run start:web
  ```
- **Run BOTH simultaneously:**
  ```
  pnpm run start:all
  ```

---

## 📁 Final Project Structure

After completing the steps above, your project should look like this:

```
AjOne/
│
├── apps/
│   ├── api/          # NestJS Backend API
│   └── web/          # React Frontend Application
│
├── libs/
│   └── database/     # Shared Database Module (@app/database)
│
├── package.json
├── pnpm-lock.yaml
└── nest-cli.json
```

---

## 💻 Installed Technologies

- **Backend:** [NestJS](https://nestjs.com/)
- **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Architecture:** Monorepo Workspace


## 🗄️ Database Connection Setup

### Step 1: Verify Packages

Make sure the following packages are installed:

```
pnpm add @nestjs/typeorm typeorm pg @nestjs/config
```

### Step 2: Create .env

In the project root (`AjOne/`), create an `.env` file:

```
AjOne/
├── .env
├── apps/
└── libs/
```

Add the following inside your `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ajone
```
> **Note:** Change the values according to your PostgreSQL installation.

### Step 3: Enable ConfigModule

Open `apps/api/src/api.module.ts` (or your main application module) and configure it as follows:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
})
export class ApiModule {}
```

### Step 4: Configure Database Module

Open `libs/database/src/database.module.ts` and replace everything with:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
```

### Step 5: Export DatabaseModule

Open `libs/database/src/index.ts` and add:

```typescript
export * from './database.module';
```

### Step 6: Create Database

Open PostgreSQL (e.g., pgAdmin or psql) and execute:

```sql
CREATE DATABASE ajone;
```

### Step 7: Start API

Run the backend application:

```
pnpm start:api
```

If everything is configured correctly, you'll see a success message similar to:
```
[Nest] Application successfully started
```