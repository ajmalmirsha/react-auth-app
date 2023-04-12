const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true,'Email is required !'],
        unique : true
    },
    password:{
        type:String,
        required: [true,'password is required !'],
        unique : true
    },

})

adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

adminSchema.statics.login = async function (email,password){
    if(email && password){
         const salt = await bcrypt.genSalt()
    const admin = await this.findOne({email})
    if(admin){
        const auth = await bcrypt.compare(password,admin.password)
        if(auth){
            return admin
        }else{
        throw Error('incorrect password')
        }

    }else{   
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

module.exports = mongoose.model('admin',adminSchema)

