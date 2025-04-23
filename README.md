# SocialSphere 🧠

A full-stack social network API built with **Node.js**, **Express**, and **MongoDB** (via **Mongoose**), designed to support a minimal social media-style backend. It enables users to share thoughts, react to friends' posts, and manage a dynamic friend list—all while following RESTful conventions.

> ⚡ Built using starter code from Module 17’s Mini Project of the Columbia Engineering Full-Stack Bootcamp.

---

## Table of Contents

- Features  
- Technologies  
- Installation  
- Usage  
- API Routes  
- Database Models  
- License  

---

## Features

✅ User account creation and management  
✅ Thought creation, update, and deletion  
✅ Reaction system for thoughts (like mini-comments)  
✅ Add/remove friends to/from user profiles  
✅ Clean and modular API structure  
✅ MongoDB aggregation for friend and reaction counts  
✅ Fully documented and tested with Postman or Insomnia

---

## Technologies

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Utilities**: Mongoose virtuals, aggregation, middleware  
- **Language**: TypeScript  
- **Development Tools**: dotenv, nodemon

---

## Installation

1. Clone the repo:  
   `git clone https://github.com/your-username/socialsphere.git && cd socialsphere`

2. Install dependencies:  
   `npm install`

3. Set up environment variables:  
   Create a `.env` file in the root directory and define:  
   ```
   MONGODB_URI=mongodb://localhost:27017/socialsphere
   PORT=3001
   ```

4. Run the server:  
   `npm run dev`

---

## Usage

Once the server is running, use Postman or Insomnia to interact with the API endpoints.

Example:  
`GET http://localhost:3001/api/users`

---

## API Routes

### Users

- `GET /api/users` – Get all users  
- `GET /api/users/:userId` – Get a single user by ID  
- `POST /api/users` – Create a new user  
- `PUT /api/users/:userId` – Update a user  
- `DELETE /api/users/:userId` – Delete a user  
- `POST /api/users/:userId/friends/:friendId` – Add a friend  
- `DELETE /api/users/:userId/friends/:friendId` – Remove a friend  

### Thoughts

- `GET /api/thoughts` – Get all thoughts  
- `GET /api/thoughts/:thoughtId` – Get a single thought  
- `POST /api/thoughts` – Create a new thought  
- `PUT /api/thoughts/:thoughtId` – Update a thought  
- `DELETE /api/thoughts/:thoughtId` – Delete a thought  
- `POST /api/thoughts/:thoughtId/reactions` – Add a reaction to a thought  
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` – Remove a reaction  

---

## Database Models

### User

- `username` (String, required, unique)  
- `email` (String, required, unique)  
- `thoughts` (Array of ObjectId references to `Thought`)  
- `friends` (Array of ObjectId references to `User`)  
- Virtual: `friendCount`

### Thought

- `thoughtText` (String, required)  
- `createdAt` (Date, formatted)  
- `username` (String, required)  
- `reactions` (Array of reaction subdocuments)  
- Virtual: `reactionCount`

### Reaction (Subdocument)

- `reactionId` (ObjectId, auto-generated)  
- `reactionBody` (String, required)  
- `username` (String, required)  
- `createdAt` (Date, formatted)

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

Built with ❤️ as part of the Columbia Engineering Full-Stack Bootcamp.  
Starter code adapted from Module 17’s Mini Project.
