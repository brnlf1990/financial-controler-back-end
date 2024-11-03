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
        payload = jwt.verify(token, 'chave-secreta');        
    }
    catch{
        const error = new Error('Incorrect email or passwordEmail')
        error.status = 401;
        next(error)
    }
req.user = payload;
next();
};

