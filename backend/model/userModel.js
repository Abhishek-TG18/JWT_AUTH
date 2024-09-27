const mongoose =require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const{Schema}=mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'User name is required'],
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    bio:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        
    }
})

userSchema.methods={
    jwtToken(){
        return JWT.sign(
            {id:this._id,username:this.username},
            process.env.SECRET,
            {
                expiresIn:'24d'
            }
        );
    }  
};

//To hash the password

userSchema.pre('save' , async function(next){

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
     return next();
})

const userModel = mongoose.model("user",userSchema);

module.exports=userModel;