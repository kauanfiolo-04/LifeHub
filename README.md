# 🚀 LifeHub

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS%2011-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

<p align="center">
  <strong>Your all-in-one personal productivity suite: smart finance, dynamic tasks, and quick notes in a single, unified Hub.</strong>
</p>

[Key Features](#-key-features) •
[Backend UML & ERD](#-backend-uml--data-modeling) •
[Backend Architecture](#-backend-architecture) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[API Reference](#-api-endpoints-reference)

</div>

---

## 📌 About the Project

**LifeHub** was created to eliminate everyday workflow fragmentation. Instead of switching between disparate spreadsheets, task lists, and notes applications, LifeHub consolidates these three essential pillars into a minimal, responsive, and high-performance experience.

---

## ✨ Key Features

### 💰 Personal Finance Management
- **Multi-Account Support**: Register and monitor checking accounts, savings, physical cash, and credit cards.
- **Detailed Transactions**: Record income and expense entries with title, description, amount, date, and category.
- **Custom Categorization**: Group spending into color-coded categories to detect expenditure trends.
- **Consolidated Metrics**: Real-time net balance calculations, monthly income/expense breakdowns, and expense distribution.

### 📋 Task Management
- **Intelligent Prioritization**: Assign task importance (`Low`, `Medium`, `High`).
- **Workflow Statuses**: Seamless state progression (`Pending`, `In Progress`, `Completed`, `Cancelled`).
- **Due Dates & Deadlines**: Filter views by temporal proximity (Due Today, This Week, or Upcoming).

### 📝 Notes & Ideas
- **Quick Capture**: Instantly jot down thoughts, meeting summaries, and reference notes.
- **Tagging System**: Multi-tag classification for fast search and cross-referencing.
- **Visual Customization**: Custom color palettes per note for immediate visual hierarchy.

### 🔐 Authentication & Security
- **Hybrid Auth Strategy**: Standard Email/Password registration with salted `bcrypt` hashing.
- **Social OAuth 2.0**: Fast one-click sign-in using Google and GitHub accounts.
- **Secure Token Rotation**: Short-lived JWT Access Tokens combined with server-hashed Refresh Tokens.

---

## 📐 Backend UML & Data Modeling

Below is the **Class & Entity-Relationship Diagram (ERD / UML)** representing the entities mapped through TypeORM and their relational constraints in PostgreSQL.

### Entity-Relationship Diagram (UML ERD)

```mermaid
erDiagram
    users ||--o| credentials : "owns (1:1)"
    users ||--o{ oauth_accounts : "links (1:N)"
    users ||--o{ accounts : "manages (1:N)"
    users ||--o{ categories : "defines (1:N)"
    users ||--o{ tasks : "creates (1:N)"
    users ||--o{ notes : "writes (1:N)"
    accounts ||--o{ transactions : "logs (1:N)"
    categories ||--o{ transactions : "classifies (1:N)"

    users {
        uuid id PK
        string email UK
        string name
        string hashedRefreshToken
        timestamp createdAt
        timestamp updatedAt
    }

    credentials {
        uuid id PK
        string passwordHash
        uuid userId FK, UK
    }

    oauth_accounts {
        uuid id PK
        OAuthProvider provider
        string providerAccountId
        uuid userId FK
    }

    accounts {
        uuid id PK
        string name
        AccountType type
        uuid userId FK
        timestamp createdAt
        timestamp updatedAt
    }

    categories {
        uuid id PK
        string name
        string color
        uuid userId FK
        timestamp createdAt
        timestamp updatedAt
    }

    transactions {
        uuid id PK
        string title
        string description
        TransactionType type
        numeric amount
        timestamp date
        uuid accountId FK
        uuid categoryId FK
        timestamp createdAt
        timestamp updatedAt
    }

    tasks {
        uuid id PK
        string title
        string description
        TaskStatus status
        TaskPriority priority
        timestamp dueDate
        uuid userId FK
        timestamp createdAt
        timestamp updatedAt
    }

    notes {
        uuid id PK
        string title
        string content
        text_array tags
        string color
        uuid userId FK
        timestamp createdAt
        timestamp updatedAt
    }
```

### Enumeration Reference

| Enum | Supported Values |
| :--- | :--- |
| `AccountType` | `checking`, `savings`, `credit_card`, `cash` |
| `TransactionType` | `income`, `expense` |
| `TaskStatus` | `pending`, `in_progress`, `completed`, `cancelled` |
| `TaskPriority` | `1 (LOW)`, `2 (MEDIUM)`, `3 (HIGH)` |
| `OAuthProvider` | `google`, `github` |

<br />

<details>
  <summary>🖼️ <strong>View Physical Database Diagram</strong></summary>
  <br />
  <img width="1536" height="1024" alt="LifeHub Database Diagram" src="https://github.com/user-attachments/assets/3733ff44-69eb-4342-8355-a0610529776e" />
</details>

---

## 🏛️ Backend Architecture

The backend follows enterprise-level **NestJS** architectural conventions, enforcing clean separation of concerns through modular layers:

```mermaid
graph TD
    Client[Frontend / Next.js Client] -->|HTTP / Bearer Token & Cookies| Router[NestJS Controller Layer]

    subgraph "Core Guards & Strategies"
        JwtGuard[JwtAuthGuard]
        GoogleGuard[GoogleAuthGuard]
        GithubGuard[GithubAuthGuard]
    end

    Router --> JwtGuard
    Router --> GoogleGuard
    Router --> GithubGuard

    subgraph "Modules & Services"
        AuthSvc[AuthService]
        UsersSvc[UsersService]
        FinanceSvc[FinanceService]
        AccountsSvc[AccountsService]
        CategoriesSvc[CategoriesService]
        TransactionsSvc[TransactionsService]
        TasksSvc[TasksService]
        NotesSvc[NotesService]
    end

    Router --> AuthSvc
    Router --> UsersSvc
    Router --> FinanceSvc
    Router --> TasksSvc
    Router --> NotesSvc

    subgraph "Persistence Layer (TypeORM Data Mapper)"
        UserRepo[(User Repository)]
        CredRepo[(Credential Repository)]
        OAuthRepo[(OAuthAccount Repository)]
        AccRepo[(Account Repository)]
        CatRepo[(Category Repository)]
        TxRepo[(Transaction Repository)]
        TaskRepo[(Task Repository)]
        NoteRepo[(Note Repository)]
    end

    UsersSvc --> UserRepo
    AuthSvc --> CredRepo
    AuthSvc --> OAuthRepo
    AccountsSvc --> AccRepo
    CategoriesSvc --> CatRepo
    TransactionsSvc --> TxRepo
    TasksSvc --> TaskRepo
    NotesSvc --> NoteRepo

    subgraph "Database"
        Neon[(Neon Serverless PostgreSQL)]
    end

    UserRepo --> Neon
    CredRepo --> Neon
    OAuthRepo --> Neon
    AccRepo --> Neon
    CatRepo --> Neon
    TxRepo --> Neon
    TaskRepo --> Neon
    NoteRepo --> Neon
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React Server Components & Server Actions)
- **Core Library**: [React 19](https://react.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) & [tw-animate-css](https://github.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) powered by Radix UI
- **Server State Management**: [TanStack Query v5](https://tanstack.com/query)
- **Icons**: [Hugeicons](https://hugeicons.com/) (`@hugeicons/react` and `@hugeicons/core-free-icons`)
- **Charts**: [Recharts](https://recharts.org/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### Backend
- **Framework**: [NestJS 11](https://nestjs.com/) (Node.js Enterprise Framework)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) hosted on [Neon Serverless](https://neon.tech/)
- **Authentication**: Passport.js (`passport-jwt`, `passport-google-oauth20`, `passport-github2`)
- **Cryptography**: `bcrypt`
- **Data Validation**: `class-validator`, `class-transformer`, and `Joi`

---

## 📁 Monorepo Structure

```plaintext
LifeHub/
├── backend/
│   ├── src/
│   │   ├── app/                # Root module, global configurations, and initialization
│   │   ├── auth/               # JWT authentication, login, signup, and OAuth strategies
│   │   ├── common/             # Exception filters, shared DTOs, and pagination helpers
│   │   ├── database/           # Seed scripts for testing and demonstration
│   │   ├── finance/            # Finance module (Accounts, Categories, and Transactions)
│   │   ├── notes/              # Notes CRUD, tagging, and coloration
│   │   ├── tasks/              # Tasks CRUD, status transitions, and priority sorting
│   │   └── users/              # User account management
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/          # Authenticated routes (/finance, /tasks, /notes)
│   │   │   ├── (auth)/         # Public auth routes (login, register, OAuth callbacks)
│   │   │   ├── page.tsx        # Modern Landing Page / Homepage
│   │   │   └── layout.tsx      # Root layout with providers
│   │   ├── components/         # Shared and feature UI components (shadcn/ui)
│   │   ├── hooks/              # Custom TanStack Query hooks
│   │   ├── services/           # Axios HTTP client configuration
│   │   └── types/              # TypeScript types and interfaces
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v20 or higher
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A PostgreSQL database instance (recommended: [Neon](https://neon.tech/))

---

### 1. Backend Setup

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create your `.env` configuration from `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Configure your environment variables in `.env`:
   ```env
   DATABASE_TYPE=postgres
   DATABASE_URL=postgresql://user:password@your-neon-host.neon.tech/lifehub?sslmode=require
   DATABASE_AUTO_LOAD_ENTITIES=true
   DATABASE_SYNCHRONIZE=true

   JWT_ACCESS_SECRET=your_super_secret_access_token_key
   JWT_TTL=3600
   JWT_REFRESH_SECRET=your_super_secret_refresh_token_key
   JWT_REFRESH_TTL=86400

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/callback/google

   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_CALLBACK_URL=http://localhost:3000/callback/github

   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```
   *(Optional: run `npm run seed` to populate demo data).*

---

### 2. Frontend Setup

1. Open a new terminal, navigate to the frontend directory, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Configure your `.env` file in the `frontend` folder:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. Launch the Next.js development server:
   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000) in your browser to explore LifeHub!

---

## 📡 API Endpoints Reference

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/signup` | Register a new user with email and password |
| **Auth** | `POST` | `/auth/login` | Authenticate and issue JWT tokens |
| **Auth** | `GET` | `/auth/google` | Initiate Google OAuth flow |
| **Auth** | `GET` | `/auth/github` | Initiate GitHub OAuth flow |
| **Finance** | `GET` | `/finance/accounts` | Retrieve user financial accounts |
| **Finance** | `POST` | `/finance/accounts` | Create a new financial account |
| **Finance** | `GET` | `/finance/transactions` | Retrieve transactions with filters and pagination |
| **Finance** | `POST` | `/finance/transactions` | Create a new transaction (income/expense) |
| **Finance** | `GET` | `/finance/categories` | Retrieve user transaction categories |
| **Tasks** | `GET` | `/tasks` | List tasks with status and priority filtering |
| **Tasks** | `POST` | `/tasks` | Create a task with priority and due date |
| **Notes** | `GET` | `/notes` | Retrieve user notes and tags |
| **Notes** | `POST` | `/notes` | Create a new note with color and tags |

---

## 📄 License

This project is built for personal productivity and learning. Feel free to clone, customize, and extend it!
