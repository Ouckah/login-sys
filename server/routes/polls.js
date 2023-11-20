const express = require('express')
const {
    getPolls,
    getPoll,
    createPoll,
    deletePoll,
    updatePoll,
    likePoll,
    dislikePoll
} = require('../controllers/pollController')

const router = express.Router()

// GET all polls
router.get('/', getPolls)

// GET a single poll
router.get('/:id', getPoll)

// POST a poll
router.post('/', createPoll)

// DELETE a poll
router.delete('/:id', deletePoll)

// UPDATE a poll
router.patch('/:id', updatePoll)

// LIKE a poll
router.patch('/like/:id', likePoll)

// DISLIKE a poll
router.patch('/dislike/:id', dislikePoll)

module.exports = router;