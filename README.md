#  Home Services Booking System

##  **Full-Stack Booking Application**
Production-ready home services booking system with  React and Node.js. Complete booking lifecycle with admin panel & MongoDB persistence.

**Features:**
- ✅ Real-time booking creation
- ✅ Service catalog management
- ✅ Admin panel with booking status updates
- ✅ Responsive UI with glassmorphism design
- ✅ MongoDB with Mongoose ORM
- ✅ RESTful APIs

##  **Live Demo**
```
Frontend: https://full-stack-booking-application-1.onrender.com
Backend:  https://full-stack-booking-application.onrender.com
```

##  **Tech Stack**
```
Frontend: React 18 + Vite + Tailwind CSS + Lucide Icons + Framer Motion
Backend:  Node.js + Express 5 + MongoDB + Mongoose
Tools:    CORS + Nodemon + dotenv
```

***

##  **Quick Start**

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

##  **Project Structure**

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

##  **API Endpoints**

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

##  **Features**

###  Frontend
- Glassmorphism UI design
- Real-time form validation
- Loading states & animations
- Responsive mobile-first design
- Service dropdown with real data

###  Backend
- RESTful API architecture
- MongoDB with Mongoose
- Error handling & logging
- CORS enabled
- Auto-restart with Nodemon

###  Admin Panel
- View all bookings
- Update booking status
- Assign service providers
- Filter by status

***

##  **Testing**

```bash
# Backend test
 url http://localhost:5000/api/test

# Seed services
 url http://localhost:5000/api/services/seed

# Create booking
 url -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"ID","address":"Meerut","scheduledAt":"2026-01-22T10:00"}'
```

***

### **MongoDB Atlas**
1. Create free cluster
2. Get connection string
3. Update `.env` MONGODB_URI

***

##  **Contributing**

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

***

##  **License**
This project is licensed under the MIT License - see the LICENSE file for details.

***






