const User = require('../models/Users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireAuth = async (req, res, next) => {

  const { authorization } = await req.headers;

  if(!authorization) {
    res
      .status(401)
      .json('Validation required');
  }

  const token = await authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findOne({ _id }).select('_id')

    next();

  } catch (error) {
    res
      .status(401)
      .json('Invalid access token')
  }

}

module.exports = requireAuth