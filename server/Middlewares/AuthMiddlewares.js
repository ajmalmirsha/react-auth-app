const AdminModel = require('../Model/AdminModel')
const UserModel = require('../Model/UserModel')
const User = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv')


module.exports.checkUser = (req, res, next) => {

  const token = req.cookies.jwt
  if (token) {
   
    jwt.verify(token, 'mysecretkey', async (err, decodedToken) => {
      if (err) {
        
        res.json({ status: false })
        next()
      } else {
       
        const user = await User.findById(decodedToken.id)
       
        if (user) {
          if (user.user) {
            
            res.json({ status: true, user: user })
          } else {
            const data = await UserModel.find({});
           

            res.status(200).json({ status: true, data: data });
          }

        } else {
          res.json({ status: false })
          next()
        }
      }
    })
  } else {
   
    res.json({ status: false })
    next()
  }
}

module.exports.checkAdmin = async (req, res, next) => {
 

  const token = req.cookies.jwt
 

  if (token) {

   
    jwt.verify(token, 'mysecretkey', async (err, decodedToken) => {
      if (err) {
        console.error('Error verifying token:', err);
        res.json({ status: false });
      } else {
      
        const admin = await AdminModel.findById(decodedToken.id);
        if (admin) {
          const data = await UserModel.find({});
         

          res.status(200).json({ status: true, data: data });
        } else {
          
          res.json({ status: false });
        }
      }
    });
  } else {
   
    res.status(200).json({ status: false });
    next()
  }
};
