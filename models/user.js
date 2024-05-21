import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required:true,
      },
      email: {
        type: String,
        required : true,
        trim : true,
        unique:true,
        min: 6,
        index:true
      },
      role:{
        type:String,
        enum:["admin","manager","medical_staff"],
        required:true
      },
      email_verification:{
        type: Number,
        enum: [0, 1],
        default:0  
      },
      password:{
        type:String,
        trim:true,
        required:true
      },
      mobile: {
        type: String,
      },
      mobile_verification:{
        type: Number,
        enum: [0, 1],
        default:0  
      },
      alternate_mobile_number: {
        type: String,
      },
      age: {
        type: Number,
      },
      gender: {
        type: String
      },
      dob: {
        type: Date,
      },
      ratings:{
        type:Number,
        default:0
      },
      profile_picture: {
        type: String,
        default:null
      },
      addresses: [
        {
            street: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                trim: true
            },
            state: {
                type: String,
                trim: true
            },
            country: {
                type: String,
                trim: true
            },
            postalCode: {
                type: String,
                trim: true
            }
        }
    ]
},{ timestamps: true })

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN
userSchema.methods.get_jwt_token = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


//Compare Password
userSchema.methods.compare_password = async function(enteredPassword){
    let isMatch= await bcrypt.compare(enteredPassword, this.password);
     return  isMatch        
}

export default mongoose.model("User",userSchema)