const fs = require('fs');
const path = require('path');

const express = require('express')
// ROUTES
const usersRoute = require('./routes/users-route');

const app = express()

// ROUTES MIDDLEWARE

// => /api/users/
app.use('/api/users', usersRoute)

const PORT = 4000;
app.listen( PORT,() => console.log(`Server is running on port ${PORT}`))