# 🍽️ NIT Kurukshetra Mess Management System

A full-stack web application built to modernize mess operations at **NIT Kurukshetra** and help reduce **food wastage** through smart attendance tracking, analytics, and student engagement.

The system provides **separate dashboards for students and administrators**, enabling efficient meal management, attendance tracking, billing, and feedback.

---

# 🎯 Project Objective

Hostel messes often prepare food without accurate demand predictions, leading to **significant food wastage**.

This system aims to solve that problem by:

- Allowing students to **RSVP meals in advance**
- Tracking attendance through **QR-based scanning**
- Providing **analytics to mess administrators**
- Monitoring **crowd levels and food consumption patterns**

This enables better **meal planning, reduced wastage, and improved mess management**.

---

# 🚀 Features

## 👨‍🎓 Student Dashboard

Students can:

- Generate a **personal QR code** for mess attendance
- **RSVP meals** (Attend / Skip)
- View **today’s menu**
- Check **live mess crowd status**
- Track **wallet balance and billing**
- Apply for **meal rebates**
- Participate in **polls**
- Submit **meal feedback**
- View **personal analytics** such as:
  - Meals attended
  - Meals skipped
  - Estimated food saved

---

## 🛠️ Admin Dashboard

Administrators can:

- **Scan QR codes** to mark student attendance
- **Search students** in the database
- **Manage mess menu**
- **Create and monitor polls**
- View **student feedback**
- Track **live crowd analytics**
- Monitor **billing and rebates**
- View **mess usage analytics**

---

# 📊 Key Modules

## QR Attendance System

Each student has a unique QR code.

Mess staff can scan the QR code to:

- verify student identity
- mark attendance
- update meal analytics

---

## Meal RSVP System

Students can choose whether they will attend meals.

This allows the mess to:

- estimate demand
- prepare accurate meal quantities
- reduce food wastage

---

## Live Crowd Monitoring

Displays the **current crowd level inside the mess**, helping students choose less crowded times.

---

## Billing & Rebates

Students can:

- track wallet balance
- view transaction history
- apply for rebates when skipping meals

Admins can review and approve rebate requests.

---

## Polls & Feedback

Students can participate in polls such as:

- food quality ratings
- menu preferences
- meal satisfaction

Admins can use this data to improve mess services.

---

# 🧱 Tech Stack

## Frontend
- React
- Vite
- Chart.js
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## Authentication
- JWT Authentication
- OTP Verification

---

# 🖥️ System Architecture
