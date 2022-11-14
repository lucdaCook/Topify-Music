const express = require('express');
const Likes = require('../models/UserLikes');
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')
const cors = require('cors')

const router = express.Router();

router.use(cors({
  origin: "*"
}))

router.use(requireAuth)

router.post('/' , async (req, res) => {
  const { title, uri, images, artists, song_id, album, duration, track_id } = req.body

  try {
    const user_id = req.user._id
    const like = await Likes.create({ title, uri, images, artists, song_id, user_id, album, duration, track_id })

    res
      .status(200)
      .json(like)

  } catch(error) {

    res
      .status(400)
      .json({ error: error.message })
  }
})


router.get('/', async (req, res) => {
  const user_id = req.user._id
  
  const likes = await Likes.find({ user_id }).sort({ createdAt: -1 })

  res
    .status(200)
    .json(likes)

})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id

  const like = await Likes.findOne({ user_id, uri: id })

  if(!like) {
    res
      .status(400)
      .json({ error: 'No Such Like' })
  }
  if(like) {
    res
    .status(200)
    .json(like)
  }
})

router.delete('/:id', async (req, res) => {

  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid) {
    res.status(400).json({ error: 'No such like' })
  }

  const like = await Likes.findOneAndDelete({ _id: id })

  if(!like) {
    res.status(400).json({ error: 'No such like' })
  }

  if(like) {
  res
    .status(200)
    .json(like)
  }
})

router.delete('/', async (req, res) => {
  const { id } = await req.body

  const like = await Likes.findOneAndDelete({ track_id: id })

  if(!like) {
    res.status(400).json({ error: 'No such like' })
  }

  if(like) {
  res
    .status(200)
    .json(like)
  }
})

module.exports = router 