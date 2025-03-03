# Kindred Cottage
Kindred Cottage is a ull-stack web application designed for managinh vacation rentals efficiently. The application allows to book stays, manage their reservations, and track using a todo list feature.

## Features
- User Authentication: Login and registration
- WIP: Booking Management: Users can book stays, specify cgeck-in/check-out dates, and manage their reservations.
- To-Do List: create, update and delete tasks related to vacation with different statuses.
- Role-Based Access: Ensure only authenticated users can access their bookings and tasks. 

## Tech Stack
- Frontend: HTML, CSS, Javascript currently (but will be separate React app in the future).
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose ORM
- Authentication: JWT-based authentication.

# API Endpoints
### Authentication
POST /api/v1/auth/register - Register a new user
POST /api/v1/auth/login - Log in and receive a token

### Booking Management
GET /api/v1/bookings - Retrieve user bookings
POST /api/v1/bookings - Create a new booking
PUT /api/v1/bookings/:id - Update/edit a booking
DELETE /api/v1/bookings/:id - Cancel a booking

### To-Do List Management
GET /api/v1/todos - Retrieve all tasks
GET /api/v1/todos:id - Retrieve a single task
POST /api/v1/todos - Add a single task
PUT /api/v1/todos/:id - Update a task
DELETE /api/v1/todos/:id - Delete a task

#### Setup: local
npm install && npm start

## Live Demo
- https://kindred-cottage.onrender.com/ 

#### License
This project is licensed under the MIT License.


