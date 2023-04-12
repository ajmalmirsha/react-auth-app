const AdminModel = require('../Model/AdminModel')
const UserModel = require('../Model/UserModel')
const User = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv')




module.exports.checkAdmin = async (req, res, next) => {
    console.log('on new check admin');
  
  
  
  
       
  console.log(req.session.admin);
    
      const token = req.cookies.jwt
      console.log('Token:', token);
    
      if (token) {
          
        console.log('Token is present');
        jwt.verify(token, 'mysecretkey', async (err, decodedToken) => {
          if (err) {
            console.error('Error verifying token:', err);
            res.json({ status: false });
          } else {
            console.log('Admin else');
            const admin = await AdminModel.findById(decodedToken.id);
            if (admin) {
              const data = await UserModel.find({});
              console.log('User data:', data);
    
              res.status(200).json({ status: true, data: data });
            } else {
              console.log('User is not an admin');
              res.json({ status: false });
            }
          }
        });
      } else {
        console.log('Token is not present');
        console.log(req.session.admin);
        // const data = await UserModel.find({});
        // console.log('User data:', data);
  
        // res.status(200).json({ status: true, data: data });
        res.status(200).json({ status: false });
        next()
      }
    };
    