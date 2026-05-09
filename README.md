# 📱 PhonePe MERN (Backend)

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Status](https://img.shields.io/badge/Project-Active-success)

A simple, easy-to-understand Backend for a PhonePe project.  
This system is heavily commented and uses beginner-friendly architectures while simulating a real-world FinTech application environment.

---

## 🌟 Full Feature Set

- 🔐 **User Authentication**  
  Strict JWT-based Register and Login system.

- 🆔 **Dynamic UPI IDs**  
  Newly registered users automatically receive a unique UPI tag  
  *(e.g., saurabh354@phonepe)*.

- 🔢 **Strict MPIN System**  
  All outbound transactions mathematically enforce a robust 4-digit MPIN verification layer.

- 💸 **Flexible Peer-to-Peer Transfers**  
  Send money directly to users using:
  - 📱 10-digit Phone Number  
  - 🏷️ UPI ID  

- 💰 **Wallet Top-Up**  
  Simulate direct bank transfers by adding test deposits into a user's wallet.

- 📲 **Utility Bill Payments**  
  Mock endpoints for:
  - Mobile Recharge  
  - Electricity Bills  
  Automatically deducts from wallet and logs BILL_PAY history.

- 📊 **Detailed Transaction Records**  
  View full history of:
  - Deposits  
  - Withdrawals  
  - Transfers  
  - Bill Payments  

- 📄 **Swagger User Interface**  
  Auto-generated API documentation with a clean UI.

- 📬 **Interactive Postman Library**  
  Pre-configured collection with auto-saving environment tokens.

---

## 🛠 Tech Stack Used

- ⚙️ **NodeJS & ExpressJS**
- 🗄️ **MongoDB + Mongoose ORM**
- 🔒 **BcryptJS** (Password & MPIN hashing)
- 🪪 **JSONWebToken (JWT)** (Authentication)
- 📘 **Swagger-UI** (API Documentation)

---

## 📖 API Endpoints

### 🔐 Auth Routes (`/api/auth`)

| Method | Endpoint       | Description |
|--------|--------------|------------|
| POST   | `/register`   | Registers user, hashes password, generates UPI ID |
| POST   | `/login`      | Validates user and returns Bearer Token |
| GET    | `/profile`    | Returns user details & MPIN status |
| POST   | `/setup-mpin` | Sets secured 4-digit MPIN *(Requires Token)* |

---

### 💸 Transaction & P2P Routes (`/api/transactions`)

| Method | Endpoint   | Description |
|--------|-----------|------------|
| POST   | `/send`    | Send money using `{ receiverIdentifier, amount, mpin }` |
| GET    | `/history` | Fetch complete transaction history |

#### 🧾 Notes:
- `receiverIdentifier` can be:
  - Phone Number  
  - UPI ID *(e.g., amit123@phonepe)*  
- All routes require **Bearer Token authentication**

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/phonepe-backend.git

# Install dependencies
npm install

# Start server
npm run dev
