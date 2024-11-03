const  bcrypt = require('bcryptjs')


  const createHash = (password) =>{
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    return hash
  }

  const validateHash = (password, hashedPassowrd) => {
  return bcrypt.compare(password, hashedPassowrd)
  }




exports.createHash = createHash
exports.validateHash = validateHash