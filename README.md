# Full-Stack Mini Blog

A modern blog application built with Next.js, Express.js, TypeScript, and PostgreSQL.

## 🚀 Features

- User authentication with JWT
- Create, read, update, and delete blog posts
- User profile management
- Responsive UI with Tailwind CSS
- Docker containerization

## 🛠️ Tech Stack

**Backend**: Express.js, TypeScript, PostgreSQL, Prisma, JWT  
**Frontend**: Next.js 15, TypeScript, Tailwind CSS, Zustand  
**Database**: PostgreSQL with Prisma ORM

## 📦 Quick Start

### With Docker (Recommended)
```bash
git clone <repository-url>
cd full-stack-mini-blog
docker-compose up --build
```

**Access:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

### Manual Setup

**Backend:**
```bash
cd backend
npm install
cp env.example .env  # Configure your database and JWT secret
npx prisma generate
npx prisma db push
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp env.local.example .env.local  # Set NEXT_PUBLIC_API_URL
npm run dev
```

## 📡 API Endpoints

**Authentication:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

**Posts:**
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create post (authenticated)
- `PUT /posts/:id` - Update post (authenticated)
- `DELETE /posts/:id` - Delete post (authenticated)

**Users:**
- `GET /users/me` - Get current user (authenticated)
- `PUT /users/me` - Update user profile (authenticated)

## 🔧 Environment Variables

**Backend (.env):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET="your-very-secret-jwt-key-here"
PORT=3000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🚀 Scripts

**Backend:**
- `npm run dev` - Development server
- `npm run build` - Build for production
- `npm run db:push` - Push schema to database

**Frontend:**
- `npm run dev` - Development server
- `npm run build` - Build for production

## 📁 Project Structure
```
├── backend/          # Express.js API
├── frontend/         # Next.js app
└── docker-compose.yml
```
