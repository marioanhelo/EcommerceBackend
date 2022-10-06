const jwt = require('jsonwebtoken')

const createToken = (data) =>{
    const token = jwt.sign(data, 'secret', {expiresIn:'1d'})
    return token

}

module.exports = { createToken }