const { json } = require("express")
const AdminModel = require("../Model/AdminModel")
const UserModel = require("../Model/UserModel")
require('dotenv')

const jwt = require('jsonwebtoken')

const maxAge = 3*24*60*60

const createToken = (id) =>{
    return  jwt.sign({id},'mysecretkey', {
        expiresIn: maxAge
    })
}


const handleErrors = (err)=>{
   console.log('on handle eroo');
   const errorMessage = err.message;
   console.log(errorMessage);
    let errors = {email:'', password:'',phone:''}
     if(errorMessage === 'incorrect Email'){
      
        errors.email = 'This email is not been registred'
     }

     if(errorMessage === 'incorrect password'){
      
        errors.password = 'wrong password'
     }

     if(errorMessage === 'Password required !'){
      
        errors.password = 'Password required !'
     }
     if(errorMessage === 'Email required !'){
      
        errors.password = 'Email required !'
     }
     if(errorMessage === 'Phone number is already registered'){
      
        errors.phone = 'Phone number is already registered'
     }

    if(err.code === 11000){
        
        const emailMatch = errorMessage.match(/email: "(.*?)"/);
        const phoneMatch = errorMessage.match(/phone: "(.*?)"/);
        if (emailMatch) {
          console.log("Duplicate email:", emailMatch[1]);
          errors.email  = 'Email is already registered'  
        } else if (phoneMatch) {
          console.log("Duplicate phone:", phoneMatch[1]);
          errors.phone = 'Phone number is already registered'
        }
    
        return errors
    }

    if(errorMessage.includes('Users validation failed')){
        console.log('validation failed problem');
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
   return errors
}

module.exports.login = async (req,res,next) =>{
    try {
console.log('on the l9gin');
     
        const  {email,password} = req.body
        const user = await UserModel.login( email, password)
        const token = createToken(user._id)
        res.cookie('jwt',token, {
            withCredentials: true ,
            httpOnly: false ,
            maxAge: maxAge * 1000
        })

        console.log(token);

        res.status(200).json({user:user,created: true})

    } catch (error) { 
        const errors  = handleErrors(error)
        res.json({errors,created:false})
    }
}

module.exports.AdminLogin = async (req,res,next) =>{
    try {
       
        const  {email,password} = req.body
        const admin = await AdminModel.login( email, password)
        console.log('admin._id',admin._id);
        const token = createToken(admin._id)

        res.cookie('jwt',token, {
            withCredentials: true ,
            httpOnly: false ,
            maxAge: maxAge * 1000

        })

        console.log(token);

        const data = await UserModel.find({})
     console.log(data);
     console.log("1");
     req.session.admin = token
     console.log(req.session.admin);
        res.status(200).json({admin:admin._id,created: true,data:data})

    } catch (error) { 
       
      

        const errors  = handleErrors(error)
        res.json({errors,created:false})
    }
}

module.exports.register = async (req,res,next) =>{
    try {
      
        const  {email,password,phone} = req.body
        const user = await UserModel.create({ email, password, phone})
        const token = createToken(user._id)
        res.cookie('jwt',token, {
            withCredentials: true ,
            httpOnly: false ,
            maxAge: maxAge * 1000
        })
console.log(user , 90000);
        res.status(201).json({user:user,created: true})

    } catch (error) {
       console.log('error on register',error.message);
      
        const errors  = handleErrors(error)
        console.log('errors',errors);
        res.json({errors,created:false})
    }
}  

module.exports.admin = async (req,res) =>{

    const token = req.cookies.jwt


  

    const data = await UserModel.find({user:true})
    console.log(data);
    res.status(200).json({data:data})

}

module.exports.deleteUser = (req,res,next) =>{
    try {
        const id = req.params.id
        console.log('id', id);
        UserModel.deleteOne({_id:id}).then((result)=>{
            console.log('deleted');
            res.json({ message: "User deleted", status: true });
        }).catch(()=>{
            console.log('not deleted');
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.editUser = async (req,res,next) =>{
    const {id,email,phone} = req.body
  console.log(id,email,phone);


 
  
  
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Valid email format');
      UserModel.updateOne({_id:id},{
        $set:{email:email,phone:phone}
       }).then(()=>{
        res.json({status:true,message:'sucessfully updated user'})
       }).catch((err)=>{
        console.log(err.message);
        res.json({status:false,message:'Oops there is some error try again'})
       })
  } else {
      console.log('Invalid email format');
      res.json({status:false,message:'Invalid email format'})
  }
  


 
}

module.exports.uploadImage = async (req,res,next) =>{
    console.log("reached upload image");
    // // console.log(req);
    // // req.file?.path = await req.file?.path.replace("public", "");
    // if (req.file) {
    //     console.log(req.file);
    //     // Handle the uploaded file here
    //   } else if (req.fileValidationError) {
    //     console.log('Error uploading file:', req.fileValidationError);
    //     // Handle the validation error here
    //   } else {
    //     console.log('Error uploading file');
    //     // Handle other types of errors here
    //   }

    console.log('this');
    console.log(req.headers.userid);
    console.log(req.body);
    console.log(req.file.filename);
    UserModel.updateOne({_id:req.headers.userid},{
        $set:{
            image:req.file.filename
        }
    }).then( async ()=>{
        console.log('updated profile');
        const data = await UserModel.findOne({_id:req.headers.userid})
         console.log(data , '89888');
            res.json({user:data})   
        
        
    })
    const {image} = req.body
    console.log(req.file ,'777');



}