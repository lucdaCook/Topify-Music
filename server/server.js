const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const requireAuth = require('./middleware/requireAuth')

const loginRoute = require('./routes/Login')
const refreshRoute = require('./routes/Refresh')
const signupRoute = require('./routes/Signup')
const signInRoute = require('./routes/SignIn')
const likesRoute = require('./routes/Likes')

mongoose.connect(process.env.MONGO_CONNECT)

app = express();
app.use(express.json());
app.use(cors())

app.use('/login', loginRoute)

app.use('/refresh', refreshRoute)

app.use('/signup', signupRoute)

app.use('/sign-in', signInRoute)

app.use('/likes', likesRoute)

PORT = process.env.PORT

app.listen(PORT)
