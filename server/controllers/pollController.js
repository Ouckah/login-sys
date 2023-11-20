const Poll = require('../models/pollModel')
const User = require('../models/userModel')
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
            likes: [], 
            dislikes: [] 
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

// INCREMENT likes on a poll
const likePoll = async (req, res) => {
    const { id } = req.params
    const { user_id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: 'No such User.'})
    }

    const user = await User.findById({ _id: user_id })

    if (!user) {
        return res.status(404).json({ error: 'Invalid user.' })
    }

    const poll = await Poll.findOne({ _id: id })

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    // check if user_id is already in the dislikes array
    if (poll.likes.includes(user_id)) {
        return res.status(400).json({ error: 'User already liked this poll.' });
    }

    // if not, push user_id to dislikes array
    poll.likes.push(user_id);

    // save the updated poll
    await poll.save();

    res.status(200).json(poll);
}

// DECREMENT likes on a poll
const unlikePoll = async (req, res) => {
    const { id } = req.params
    const { user_id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: 'No such User.'})
    }

    const user = await User.findById({ _id: user_id })

    if (!user) {
        return res.status(404).json({ error: 'Invalid user.' })
    }

    const poll = await Poll.findOne({ _id: id })

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    // check if user_id is not already in the likes array
    if (!poll.likes.includes(user_id)) {
        return res.status(400).json({ error: 'User has not liked this poll.' });
    }

    // if it is, pull user_id from dislikes array
    poll.likes = poll.likes.filter((u_id) => u_id !== user_id)

    // save the updated poll
    await poll.save();

    res.status(200).json(poll);
}

// INCREMENT dislikes on a poll
const dislikePoll = async (req, res) => {
    const { id } = req.params
    const { user_id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: 'No such User.'})
    }

    const user = await User.findById({ _id: user_id })

    if (!user) {
        return res.status(404).json({ error: 'Invalid user.' })
    }

    const poll = await Poll.findOne({ _id: id })

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    // check if user_id is already in the dislikes array
    if (poll.dislikes.includes(user_id)) {
        return res.status(400).json({ error: 'User already disliked this poll.' });
    }

    // if not, push user_id to dislikes array
    poll.dislikes.push(user_id);

    // save the updated poll
    await poll.save();

    res.status(200).json(poll);
}

// DECREMENT dislikes on a poll
const undislikePoll = async (req, res) => {
    const { id } = req.params
    const { user_id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Poll.'})
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: 'No such User.'})
    }

    const user = await User.findById({ _id: user_id })

    if (!user) {
        return res.status(404).json({ error: 'Invalid user.' })
    }

    const poll = await Poll.findOne({ _id: id })

    if (!poll) {
        return res.status(404).json({error: 'No such Poll.'})
    }

    // check if user_id is not already in the dislikes array
    if (!poll.dislikes.includes(user_id)) {
        return res.status(400).json({ error: 'User has not disliked this poll.' });
    }

    // if it does, pull user_id from dislikes array
    poll.dislikes = poll.dislikes.filter((u_id) => u_id !== user_id)

    // save the updated poll
    await poll.save();

    res.status(200).json(poll);
}

module.exports = {
    getPolls, 
    getPoll,
    createPoll,
    deletePoll,
    updatePoll,
    likePoll,
    unlikePoll,
    dislikePoll,
    undislikePoll
}