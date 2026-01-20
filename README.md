# 🚀 Home Services Booking System

[
[
[
[

## ✨ **Full-Stack Booking Application**
AI-powered home services booking platform with **React + Next.js Frontend** & **Node.js + Express + MongoDB Backend**

**Features:**
- ✅ Real-time booking creation
- ✅ Service catalog management
- ✅ Admin panel with booking status updates
- ✅ Responsive UI with glassmorphism design
- ✅ MongoDB with Mongoose ORM
- ✅ RESTful APIs

## 📱 **Live Demo**
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

## 🛠️ **Tech Stack**
```
Frontend: React 18 + Vite + Tailwind CSS + Lucide Icons + Framer Motion
Backend:  Node.js + Express 5 + MongoDB + Mongoose
Tools:    CORS + Nodemon + dotenv
```

***

## 🚀 **Quick Start**

### **1. Clone & Install**
```bash
git clone https://github.com/yourusername/home-services-booking-system.git
cd home-services-booking-system
```

### **2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```
**Backend runs on:** `http://localhost:5000`

### **3. Seed Services (MANDATORY)**
```
http://localhost:5000/api/services/seed
```

### **4. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
**Frontend runs on:** `http://localhost:5173`

***

## 📁 **Project Structure**

```
home-services-booking-system/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API logic
│   │   ├── models/          # Mongoose schemas
│   │   └── routes/          # Express routes
│   ├── server.js            # Main server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   └── App.jsx          # Main app
│   └── package.json
└── README.md
```

***

## 🔧 **Environment Variables (.env)**

**Create `.env` files & **NEVER commit to GitHub!**

### **backend/.env**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/home-services?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### **frontend/.env** (optional)
```env
VITE_API_URL=http://localhost:5000/api
```

### **🛡️ .env को GitHub से Hide कैसे करें:**

```bash
# 1. .gitignore में add करें
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "node_modules/" >> .gitignore

# 2. Already committed .env remove करें
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

***

## 🌐 **API Endpoints**

| Method | Endpoint              | Description              |
|--------|----------------------|--------------------------|
| `POST` | `/api/bookings`      | Create new booking       |
| `GET`  | `/api/bookings`      | Get all bookings         |
| `GET`  | `/api/services`      | Get all services         |
| `GET`  | `/api/services/seed` | Seed sample services     |

**Test API:**
```
http://localhost:5000/api/test
```

***

## 🎮 **Features**

### **✅ Frontend**
- Glassmorphism UI design
- Real-time form validation
- Loading states & animations
- Responsive mobile-first design
- Service dropdown with real data

### **✅ Backend**
- RESTful API architecture
- MongoDB with Mongoose
- Error handling & logging
- CORS enabled
- Auto-restart with Nodemon

### **✅ Admin Panel**
- View all bookings
- Update booking status
- Assign service providers
- Filter by status

***

## 🧪 **Testing**

```bash
# Backend test
curl http://localhost:5000/api/test

# Seed services
curl http://localhost:5000/api/services/seed

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"ID","address":"Meerut","scheduledAt":"2026-01-22T10:00"}'
```

***

## 🚀 **Production Deployment**

### **Backend (Render/Vercel/Heroku)**
```bash
npm install -g pm2
pm2 start server.js --name "home-services"
```

### **Frontend (Vercel/Netlify)**
```bash
npm run build
npm run preview
```

### **MongoDB Atlas**
1. Create free cluster
2. Get connection string
3. Update `.env` MONGODB_URI

***

## 🤝 **Contributing**

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

***

## 📄 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

***

