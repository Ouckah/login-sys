const express = require('express')
const {
    loginUser,
    signupUser
} = require('../controllers/authController')

const router = express.Router()

// LOGIN user
router.post('/login', () => {})

// SIGN UP user
router.post('/signup', signupUser)

module.exports = router;