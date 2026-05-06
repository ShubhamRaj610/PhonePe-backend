PhonePe MERN Clone (Backend Only)
A simple, easy-to-understand Backend for a PhonePe clone project. This system is heavily commented and uses beginner-friendly architectures while simulating a real-world FinTech application environment.

🌟 Full Feature Set
User Authentication: Strict JWT-based Register and Login system.
Dynamic UPI IDs: Newly registered users automatically receive a unique UPI tag (e.g., saurabh354@phonepe).
Strict MPIN System: All outbound transactions mathematically enforce a robust 4-digit MPIN verification layer.
Flexible Peer-to-Peer Transfers: Send money directly to users by entering either their 10-digit Phone Number OR their assigned UPI ID.
Wallet Top-Up: Simulate direct bank transfers by adding test deposits into a user's wallet via the Top-up route.
Utility Bill Payments: Mock endpoints for recharging Mobile Data or paying Electricity Bills. Recharges natively deduct wallet bounds while logging specialized BILL_PAY histories.
Detailed Transaction Records: See all history of deposits, withdrawals, utility bills, and friend transfers mapped recursively to the user logged in.
Swagger User Interface: A complete webpage auto-generating readable tables for all your available endpoints.
Interactive Postman Library: Complete endpoint repository fully equipped with auto-saving Environment token scripting out-of-the-box!


🛠 Tech Stack Used
NodeJS & ExpressJS Framework
MongoDB Memory System with Mongoose ORM
BcryptJS (Password & MPIN ciphering)
JSONWebToken (Session Validation)
Swagger-UI (Auto Documentations)



📖 Available API Endpoints Summary
Auth Routes (/api/auth)
POST /register: Registers a user, hashes password, grants a randomized UPI string.
POST /login: Validates password and issues the Bearer Token.
GET /profile: Safely returns user context and checks if hasMpinSet is activated.
POST /setup-mpin: Updates the system with a secured 4-digit PIN hash block. (Requires Bearer Token)
Transaction & P2P Routes (/api/transactions)
POST /send: Send real test funds. Takes { receiverIdentifier, amount, mpin }. (receiverIdentifier can be standard phone digits OR a UPI block like amit123@phonepe). (Requires Bearer Token)
GET /history: Dumps a historical JSON array isolating everything categorized under standard TRANSFERs and Bills mapped to standard dates. (Requires Bearer Token)
