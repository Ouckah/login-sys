const express = require('express')
const {
    getPolls,
    getPoll,
    createPoll,
    deletePoll,
    updatePoll,
    likePoll,
    unlikePoll,
    dislikePoll,
    undislikePoll
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

// UNLIKE a poll
router.patch('/unlike/:id', unlikePoll)

// DISLIKE a poll
router.patch('/dislike/:id', dislikePoll)

// UNDISLIKE a poll
router.patch('/undislike/:id', undislikePoll)

module.exports = router;