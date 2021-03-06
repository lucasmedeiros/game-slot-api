const {
  createUserReview,
  updateUserReview,
  getReview,
  deleteUserReview,
  getGameReviews,
  getUserReviewByGame,
} = require('../services/review.service')

module.exports = {
  create: async function (req, res) {
    const { _id } = req.user
    const { gameId, text, recommendation } = req.body

    try {
      const existingReview = await getUserReviewByGame({ gameId, userId: _id })
      if (existingReview)
        throw new Error(`there's an existing review for this game from user ${_id}`)
      const review = await createUserReview({
        gameId,
        userId: _id,
        recommend: recommendation,
        text: text || '',
      })
      return res.status(201).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  update: async function (req, res) {
    const { _id } = req.user
    const { id } = req.params
    const { text, recommendation } = req.body

    try {
      const review = await updateUserReview({
        reviewId: id,
        userId: _id,
        text,
        recommend: recommendation,
      })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  get: async function (req, res) {
    const { _id } = req.user
    const { id } = req.params

    try {
      const review = await getReview({ reviewId: id, userId: _id })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  getAll: async function (req, res) {
    const { page, limit } = req.query
    const { id } = req.params

    try {
      const reviews = await getGameReviews({ limit, page, gameId: id })
      return res.status(200).json(reviews)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  getByUserAndGame: async function (req, res) {
    const { _id } = req.user
    const { gameId } = req.params

    try {
      const reviews = await getUserReviewByGame({ userId: _id, gameId })
      return res.status(200).json(reviews)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  remove: async function (req, res) {
    const { _id } = req.user
    const { id } = req.params

    try {
      const review = await deleteUserReview({ reviewId: id, userId: _id })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
}
