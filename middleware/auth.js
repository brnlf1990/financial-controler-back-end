require('dotenv').config()
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res
        .status(401)
        .send({message:'Autorização necessária'});
    }
    const token = authorization.replace('Bearer ', '');

    let payload;
    try {
        payload = jwt.verify(token, JWT_SECRET);        
    }
    catch{
        return res.status(401).send({ message: 'Token inválido ou expirado' });
    }
req.user = payload;
next();
};

