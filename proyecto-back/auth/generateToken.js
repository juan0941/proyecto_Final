const jwt = require("jsonwebtoken");

function sing(payload, isAccessToken){
    return jwt.sign(
        payload, 
        isAccessToken? 
        process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRECT,
        {
            algorithm: 'HS256',
            expiresIn: 3600,
        })
}

function generateAccesToken(user){
    return sing({user}, true);
}
function generateRefreshToken(user){
    return sing({user}, false);

}

module.exports = { generateAccesToken, generateRefreshToken};
