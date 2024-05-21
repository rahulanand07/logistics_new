import User from "../models/user.js"
import bcrypt from "bcryptjs"
import { send_token } from "../utils/helpers.js"

const register = async(req,res)=>{
    try {
        // let {name,email,password} = req.body

        let user_obj = {
            ...req.body
        }

        let new_user = new User(user_obj)
        await new_user.save();

        return res.status(200).json({
            status: true,
            message: "User created Successfully"
        });
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status:false,
            message:"ERROR",
            data:error.message
        })
    }
}


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
            status:false,
            message:"Email and Password are required"
        })
    }
      const user = await User.findOne({email})
        
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
            status:false,
            message:"Invalid User or Credentials"
        })
      }
      if (user) {
        send_token(res, user);
      }
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            status:false,
            message:"ERROR",
            data:error.message
        })
    }
  };


export {
    register,
    login
}