const express = require('express')
const router = express.Router()
const {signupController, loginController, getSessionController,logoutController} = require('./controllers/user.controller')
const deserializeUser = require('./middlewares/deserializeUser')
const validator = require('./middlewares/validator')


router.post('/signup',validator('userSchema'),signupController)
router.post('/login',validator('loginSchema'),loginController)
router.get('/session',deserializeUser,getSessionController)
router.delete('/logout',deserializeUser, logoutController )

module.exports = router