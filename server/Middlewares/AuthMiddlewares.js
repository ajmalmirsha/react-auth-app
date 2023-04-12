const AdminModel = require('../Model/AdminModel')
const UserModel = require('../Model/UserModel')
const User = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv')


module.exports.checkUser   = (req,res,next) =>{

    const token = req.cookies.jwt
    if(token){
      console.log('tokennnssss');
        jwt.verify(token,'mysecretkey',async (err,decodedToken)=>{
        if(err){
          console.log('token err');
            res.json({status:false})
            next()
        }else{
          console.log('tkone no err');
            const user = await User.findById(decodedToken.id)
            console.log('user',user);
            if(user){
                if(user.user){
                  console.log('seccess');
                   res.json({status:true,user:user})
                }else{
                  const data = await UserModel.find({});
                  console.log('User data:', data);
        
                  res.status(200).json({ status: true, data: data });
                }
               
            }else{
                res.json({status:false})
                next()
            }
        }
        })
    }else{
      console.log('no tokenssss');
        res.json({status:false})
        next()
    }
}

module.exports.checkAdmin = async (req, res, next) => {
  console.log('on check admin');




     
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
  