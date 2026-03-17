# 🍔 Tasty Treat — Food Ordering Web Application

<p align="center">
  <img src="public/res-logo.png" alt="Tasty Treat Logo" width="120" />
</p>

<p align="center">
  A full-stack food ordering application built with <b>React</b> and <b>Spring Boot</b>.<br/>
  Browse delicious meals, add them to your cart, and place orders — all in one place!
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Home Page** | Hero banner, category filters, trending items, testimonials & service highlights |
| 🍕 **Browse & Search** | Filter food by category (Burger, Pizza, Bread), search by name, sort by price |
| 📄 **Food Details** | Individual product page with image, description, price & related items |
| 🛒 **Cart Management** | Add/remove items, adjust quantity, view totals — powered by Redux |
| 💳 **Checkout** | Shipping address form with order placement |
| 🔐 **Authentication** | JWT-based login & registration with role-based access (User / Admin) |
| 👤 **User Orders** | Track your order history with live status (Preparing → Dispatched → Delivered) |
| 🛡️ **Admin Dashboard** | Manage all users & orders, update order status |
| 📧 **Email Notifications** | Powered by Spring Boot Mail |
| 🌐 **Responsive Design** | Mobile-friendly UI with Bootstrap 5 & Reactstrap |

---

## 🏗️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **Redux Toolkit** | Global state management (cart, auth) |
| **React Router v6** | Client-side routing |
| **Bootstrap 5 + Reactstrap** | Responsive UI components |
| **Remixicon** | Icon library |
| **React Slick** | Image/testimonial carousels |
| **React Toastify** | Toast notifications |
| **React Paginate** | Pagination for food listings |

### Backend

| Technology | Purpose |
|---|---|
| **Spring Boot 4** | REST API framework |
| **Spring Security** | Authentication & authorization |
| **JWT (jjwt 0.12)** | Token-based auth |
| **Spring Data JPA + Hibernate** | ORM & database access |
| **PostgreSQL** | Relational database |
| **Spring Boot Mail** | Email service |
| **Bean Validation** | Request validation |
| **Spring Actuator** | Health monitoring |

---

## 📁 Project Structure

```
Tasty-Treat/
├── public/                     # Static assets & index.html
│   ├── index.html
│   └── res-logo.png
│
├── src/                        # React frontend source
│   ├── assets/
│   │   ├── fake-data/          # Mock product data
│   │   └── images/             # Product & UI images
│   ├── components/
│   │   ├── Footer/             # Footer component
│   │   ├── Header/             # Navbar & header
│   │   ├── Helmet/             # Page title wrapper
│   │   ├── Layout/             # App layout wrapper
│   │   └── UI/                 # Reusable UI (ProductCard, etc.)
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── AllFoods.jsx        # Browse all food items
│   │   ├── FoodDetails.jsx     # Single food detail
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Checkout.jsx        # Order checkout
│   │   ├── Login.jsx           # User login
│   │   ├── Register.jsx        # User registration
│   │   ├── UserOrders.jsx      # User order history
│   │   ├── AdminDashboard.jsx  # Admin panel
│   │   └── Contact.jsx         # Contact page
│   ├── routes/
│   │   └── Routers.js          # Route definitions
│   ├── store/
│   │   └── store.js            # Redux store config
│   ├── styles/                 # CSS / SCSS stylesheets
│   ├── utils/                  # Utility functions
│   ├── App.js                  # Root component
│   └── index.js                # Entry point
│
├── backend/                    # Spring Boot backend
│   ├── src/main/java/com/tasty/treat/
│   │   ├── TreatApplication.java
│   │   ├── controller/
│   │   │   ├── UserController.java
│   │   │   ├── CartController.java
│   │   │   └── OrderController.java
│   │   ├── model/
│   │   │   ├── User.java
│   │   │   ├── Cart.java
│   │   │   ├── CartItem.java
│   │   │   ├── Order.java
│   │   │   └── OrderItem.java
│   │   ├── repository/         # JPA repositories
│   │   ├── request/            # DTO / request objects
│   │   └── security/           # JWT filter & config
│   └── pom.xml                 # Maven dependencies
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 16 & **npm**
- **Java** 17+
- **Maven** 3.8+
- **PostgreSQL** 15+

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Piyush0503/Tasty-Treat.git
cd Tasty-Treat
```

### 2️⃣ Backend Setup

```bash
cd backend
```

Configure your database in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tasty_treat
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
```

Run the backend:

```bash
./mvnw spring-boot:run
```

The API will start on **`http://localhost:8080`**.

### 3️⃣ Frontend Setup

```bash
# From the project root
npm install
npm start
```

The app will open at **`http://localhost:3000`**.

---

## 🔌 API Endpoints

### Auth & Users

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login & receive JWT |

### Cart

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cart/{userId}` | Get user's cart |
| `POST` | `/api/cart/add` | Add item to cart |
| `DELETE` | `/api/cart/remove/{itemId}` | Remove item from cart |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders/place` | Place a new order |
| `GET` | `/api/orders/user/{userId}` | Get user's orders |
| `GET` | `/api/orders/all` | Get all orders (Admin) |
| `PUT` | `/api/orders/{orderId}/status` | Update order status (Admin) |

> **Note:** All endpoints except `/register` and `/login` require a valid JWT token in the `Authorization: Bearer <token>` header.

---

## 📸 Screenshots

<!-- Add your screenshots here -->
<!-- Example: -->
<!-- ![Home Page](screenshots/home.png) -->
<!-- ![Cart Page](screenshots/cart.png) -->

> 💡 *Add screenshots of your app to a `screenshots/` folder and uncomment the lines above to display them.*

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the React dev server |
| `npm run build` | Create production build |
| `npm test` | Run frontend tests |
| `npm run deploy` | Deploy to GitHub Pages |
| `./mvnw spring-boot:run` | Start the Spring Boot backend |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Piyush** — [@Piyush0503](https://github.com/Piyush0503)

---

<p align="center">
  Made with ❤️ and lots of 🍕
</p>
