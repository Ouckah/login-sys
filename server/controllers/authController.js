const User = require('../models/userModel')
const mongoose = require('mongoose')

const loginUser = async (req, res) => {

}

const signupUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.signupUser(email, password)
        .then((response) => res.status(200).json({ email, user }))
        .catch((error) => res.status(400).json({ error: error.message }))
}

module.exports = {
    loginUser,
    signupUser
}