const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/Users')

const createJwt = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '5d'})
}

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.login(email, password)

    const jwToken = createJwt(user._id)

    res
      .status(200)
      .json({ email, jwToken })

  } catch (error) {

    res
      .status(400)
      .json({ error: error.message })

  }


})

module.exports = router 