# 🗓️ Next.js Events App

A full-stack event management app built with **Next.js 13+ (App Router)**, **Prisma**, and **PostgreSQL**.  
It supports **user authentication**, **event creation**, **private dashboards**, and **public shareable links**.

---

## 🚀 Features
- 🔐 **Authentication** (Sign up / Sign in / JWT + HttpOnly cookies).
- 👤 **Protected routes** with Next.js middleware.
- 📝 **Create & manage events** (title, date, location, description).
- 📅 **Filter events** (all, upcoming, past).
- 🔗 **Public shareable links** for each user’s events (`/users/:id`).
- 🚪 **Logout functionality**.
- 🌱 **Database seeding** with sample users and events.

---

## 🛠️ Tech Stack
- [Next.js 13+ (App Router)](https://nextjs.org/docs/app)  
- [Prisma ORM](https://www.prisma.io/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [JWT Authentication](https://jwt.io/)  
- [TailwindCSS](https://tailwindcss.com/)  

---

## ⚙️ Setup Instructions


### Step 1 - Clone the repo

```bash
git clone https://github.com/d4ny4z0rd/mini_event_tracker.git
cd mini_event_tracker

### Step 2 -

npm install
# or
yarn install


### Step 3 - Create your env file

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mini_event_tracker"
JWT_SECRET="your-secret-key"


### Step 4 - Setup Prisma

npx prisma generate
npx prisma migrate dev --name init


### Step 5 - Seed the database

npm run seed


### Step 6 - Run the Dev Server

npm run dev
