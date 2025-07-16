# Chat_app

https://github.com/user-attachments/assets/bf37f5f0-a3eb-460e-a0de-5380e75e4d5d

# 💬 Real-Time Chat Application

A modern, full-stack chat application built with the MERN stack, featuring real-time messaging, AI integration, and image sharing capabilities.

## 🎥 Demo Video

https://github.com/Mani-420/Chat_app/assets/your-video.mp4

*Click to watch the full demo of the chat application in action!*

## 🌟 Features

### 🚀 Core Features
- **Real-time messaging** with Socket.IO
- **AI-powered chat** using Google Gemini API
- **Image sharing** with Cloudinary integration
- **User authentication** with JWT tokens
- **Online/offline status** indicators
- **Message history** persistence
- **Responsive design** for all devices

### 🎨 UI/UX Features
- **Modern UI** with DaisyUI components
- **Dark/Light theme** switching
- **Smooth animations** and transitions
- **Loading states** and error handling
- **Mobile-first** responsive design
- **Professional styling** with Tailwind CSS

### 🔧 Technical Features
- **Real-time communication** via WebSockets
- **State management** with Zustand
- **File upload** handling
- **Image optimization** and compression
- **JWT authentication** with refresh tokens
- **MongoDB** data persistence

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **DaisyUI** - UI components
- **Zustand** - State management
- **Socket.IO Client** - Real-time communication
- **React Router** - Navigation
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Google Gemini API** - AI integration

## 📱 Screenshots

![Image](https://github.com/user-attachments/assets/48ff8224-b1dc-470d-9ec7-79444244f840)

![Image](https://github.com/user-attachments/assets/6f567c0c-350a-4721-8d42-f89834c395dc)

![Image](https://github.com/user-attachments/assets/5ef99197-52b3-4ae9-88f3-ede0e3db2ab1)

![Image](https://github.com/user-attachments/assets/1317eadd-bb04-42e5-bf39-493958fbfbcb)

![Image](https://github.com/user-attachments/assets/d9c474c5-56aa-4c3c-9f92-023d33f37450)

![Image](https://github.com/user-attachments/assets/fd5d7fd1-0cc4-49d1-9e54-4829d57554d0)

![Image](https://github.com/user-attachments/assets/64c0716f-6ba3-4110-9303-20bd748a49bb)

## Key Learnings
### Through building this project, I gained experience in:

- Real-time communication implementation with Socket.IO
- State management using Zustand for React applications
- AI API integration for enhanced user interactions
- File upload and cloud storage management
- JWT authentication with refresh token strategy
- MongoDB database design and operations
- Responsive design principles and implementation

##Challenges Overcome
- Socket Connection Management - Handling connection states and cleanup
- Nested Data Structures - Managing complex user and message data
- Real-time Synchronization - Ensuring messages sync across clients
- Image Optimization - Handling large file uploads efficiently
- State Persistence - Maintaining user state across sessions

## GitHub: [@Mani-420](https://github.com/Mani-420)
## LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/abdul-rehman-7068aa315/)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Google API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Mani-420/Chat_app.git
cd Chat_app

## Install backend dependencies
cd backend
npm install

## Install frontend dependencies
cd ../frontend
npm install

## Set up environment variables
### Backend (.env):
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_API_KEY=your_google_api_key

## Start the development servers
### Backend:
cd backend
npm run dev

### Frontend:
cd frontend
npm run dev

## Open your browser and navigate to http://localhost:5173

## Project Structure:
Chat_app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   ├── socket/
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   └── constants/
│   └── public/
└── README.md

## API Endpoints
### Authentication
POST /api/users/register - User registration
POST /api/users/login - User login
POST /api/users/logout - User logout
GET /api/users/check - Check authentication
### Messages
GET /api/messages/users - Get all users
GET /api/messages/:id - Get messages with user
POST /api/messages/send/:id - Send message
### AI Chat
POST /api/ai/chat - Send message to AI
GET /api/ai/conversation - Get AI conversation
