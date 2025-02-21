# 🚀 Yatri Motors Blog App

A **Next.js** application that retrieves and displays blogs with individual blog detail pages.

## 📂 Project Structure

This project consists of:

- **my-app:** Built with **Next.js** and **TypeScript**. This is the main frontend application where the blogs are retrieved and rendered.
- **server:** Not necessary to start, as the API is fetched from a different hosted server.

## 🔧 Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/domster4444/yatrimotor-assignment.git
   ```

2. Navigate into the project directory's my-app folder:

   ```bash
   cd my-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   You can now access the app at `http://localhost:3000`.

## 🌐 API Integration

The blog data is fetched from an external API hosted on a different server. You don't need to worry about starting or configuring a server for the backend part of the application.

### API Endpoints

- **GET https://api.yourschoolsoftware.com/api/v1/post/get-all:** Fetches a list of all blogs.
- **GET https://api.yourschoolsoftware.com/api/v1/post/get/:id:** Fetches a single blog's details based on its ID.

## 📄 Features

- **Dynamic Routes:** Each blog has its own detail page using dynamic routing in Next.js.
- **API Integration:** The app fetches blog data from an external API and displays it.
- **Responsive Design:** The app is fully responsive and adapts to various screen sizes.
- **SEO Optimized:** Built with SEO-friendly practices, including metadata and structured data.
- **Pagination:** Blog page consists of pagination built on top of react-pagination lib
- **Search:** Blogs can be searched from search field present in index.tsx.

---

## 🚀 Getting Started

### 🔹 Prerequisites

Ensure you have the following installed:

- **Nextjs v13+** (v18+)
- **npm** / **pnpm** / **bun**

---

### 🎨 Running the Frontend

To start the frontend:

```bash
npm run dev       # Using npm

# or
yarn dev         # Using yarn

# or
pnpm dev         # Using pnpm

# or
bun dev          # Using bun

```

---
