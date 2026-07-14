# 🛒 E-Commerce Store

A modern, responsive e-commerce storefront web application built using **React 19**, **Vite**, and **Tailwind CSS v4**, featuring state management powered by **Redux Toolkit** and smooth client-side routing via **React Router v8**. The application delivers a premium shopping experience with dynamic product catalogs, category-based filtering, detailed product pages, an interactive slide-out cart drawer with instant toast notifications, a comprehensive checkout workflow, and built-in support for seamless dark/light mode transitions.

---

## ✨ Features

- **Dynamic Product Catalog**: Fetches product listings from a remote API and presents them in an elegant grid layout with responsive styling.
- **Product Filtering & Detail Views**: View products by category or dive into individual product pages with rich details, images, pricing, and descriptions.
- **Interactive Shopping Cart**: Add, edit quantities, or remove items in real-time. Features a slide-out cart drawer and instant visual feedback via custom toast notifications.
- **Smooth Checkout Flow**: A multi-step simulated checkout experience with input validation and clean layout.
- **Seamless Theme Context**: Full support for system-preferred and toggleable light/dark modes with local storage persistence.
- **Persistent Cart State**: Automatically saves and restores shopping cart contents using `localStorage` synchronization.

---

## 🛠️ Tech Stack

### Frontend & Logic
- **React 19**: Component-based UI rendering.
- **Redux Toolkit**: Predictable global state management (products, categories, and cart).
- **React Router v8**: Declarative, client-side routing.
- **Axios**: Promised-based HTTP client for API data fetching.

### Styling & UI
- **Tailwind CSS v4**: Utility-first CSS framework with native CSS variables and modern custom styling.
- **Lucide React**: Clean, lightweight icons.
- **React Context API**: Lightweight dark/light mode context.

---

## 📂 Project Structure

```text
ecommerce-store/
├── public/                 # Static assets
└── src/
    ├── components/         # Shared components (Navbar, Footer, CartDrawer, etc.)
    ├── context/            # ThemeContext for light/dark mode
    ├── feature/            # Redux slices (cartSlice, productSlice, categorySlice)
    ├── pages/              # Routed pages (HomePage, AllProduct, CategoryPage, Checkout, etc.)
    ├── services/           # API interaction functions (Axios client)
    ├── store/              # Redux store configuration
    ├── App.jsx             # Root layout & routing configuration
    ├── index.css           # Global CSS and Tailwind directives
    └── main.jsx            # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/burhan-15/E-Commerce-Store.git
   cd E-Commerce-Store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

The application will run locally at `http://localhost:5173`.

### Production Build

Build the project for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
