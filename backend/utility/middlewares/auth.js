const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = "process.env.JWT_SECRET";


const signJWTToken = user => {
    const token = jwt.sign({
        daoId: user.daoId,
        address: user.address,
        message: user.message,
    },
        JWT_SECRET,
        { expiresIn: '5m' }
    );

    return token;
};

const hashUserData = (user) => {

    //create user schema 
        try {
            const token = signJWTToken(user);
            return res.status(201).json({ authToken: token });
        }
        catch (err) {
            return res.status(500).json({ message: "Couldn't create a token. Please check your inputs." })
        }
}

module.exports = { signJWTToken, hashUserData };