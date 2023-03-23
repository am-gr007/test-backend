const {UnauthenticatedError} = require('../errors/unauthenticated')
const axios = require('axios')


// setting up the middleware
const auth = async (req, res, next) => {
    // check header of the incoming request
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        // req.user = {id_token: token, authorised: true}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }

}


const checkAuthenticated = async (req, res, next) => {
    if(!req.isAuthenticated()){
        throw new UnauthenticatedError('Unauthorised user')
    }
    return next()
}

module.exports = {auth, checkAuthenticated}