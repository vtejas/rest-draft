const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const signJwt = (jwtObject)=>{
    return jwt.sign(jwtObject, JWT_SECRET, { expiresIn: '5m' });
}

const verifyJwt =async  (token)=>{
try {
    return jwt.verify(token, JWT_SECRET);
} catch (error) {
    return false
}
}

module.exports = {signJwt, verifyJwt}