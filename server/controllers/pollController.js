const Poll = require('../models/pollModel')
const mongoose = require('mongoose')

// GET all polls
const getPolls = async (req, res) => {
    const polls = await Poll.find({}).sort({ createdAt: -1 })

    res.status(200).json(polls)
}

// GET a single poll
const getPoll = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    const poll = await Poll.findById(id)

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    res.status(200).json(poll)
}

// POST a poll
const createPoll = async (req, res) => {
    const { content } = req.body

    try {
        const poll = await Poll.create({ 
            content, 
            likes: 0, 
            dislikes: 0 
        })
        res.status(200).json(poll)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a poll
const deletePoll = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    const poll = await Poll.findOneAndDelete({ _id: id })

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    res.status(200).json(poll)
}

// UPDATE a poll
const updatePoll = async (req, res) => {
    const { id } = req.params
    const { content } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    const poll = await Poll.findOneAndUpdate({ _id: id }, {
        content
    })

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    res.status(200).json(poll)
}

// UPDATE likes on a poll
const likePoll = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    const poll = await Poll.findOneAndUpdate({ _id: id }, 
        { $inc: { likes: 1 } },
        { new: true }
    )

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    res.status(200).json(poll)
}

// UPDATE dislikes on a poll
const dislikePoll = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    const poll = await Poll.findOneAndUpdate({ _id: id }, 
        { $inc: { dislikes: 1 } },
        { new: true }
    )

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    res.status(200).json(poll)
}

module.exports = {
    getPolls, 
    getPoll,
    createPoll,
    deletePoll,
    updatePoll,
    likePoll,
    dislikePoll
}