const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true,'Email is required !'],
        unique : true
    },
    phone:{
        type:String,
        required: [true,'phonenumber is required !'],
        unique : true
    },
    password:{
        type:String,
        required: [true,'password is required !'],
        unique : true
    },
    user:{
        type:Boolean,
        default:true
    }
    ,
    image:{
        type:String
        }

})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.statics.login = async function (email,password){
    console.log('go for logins');
    if(email && password){
         const salt = await bcrypt.genSalt()
    const user = await this.findOne({email})
    if(user){
        console.log('user is there');
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }else{
        throw Error('incorrect password')
        }

    }else{
        console.log('user is not there');
    throw Error('incorrect Email')
    }
    }else{
        if(!email){
            throw Error('Email required !')
        } else if (!password){
            throw Error('Password required !')
        }
    }
   

}

module.exports = mongoose.model('Users',userSchema)

