Edu-Verse 
Online Platform for students for learning new things and Grow with Eduverse.

Instructor Credentials:
rahul@test.com
amit@test.com
Password: 123456

Admin Credentials:
admin@test.com
Password: 123456

Authentication 
JWT-based

Features
👨‍💼 Admin Panel
View all instructors
Create new courses
Assign lectures (date + instructor)
Prevent double-booking of instructors

👨‍🏫 Instructor Panel
View all assigned lectures
See course name and lecture date

🛠️ Tech Stack

Frontend
React (Vite)
Tailwind CSS
Axios

Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Bcrypt (password hashing)

.env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

Script to add instructor and admin
node utils/seedUsers.js
 
Backend
npm install
npm run dev

Frontend
npm install 
npm run dev
