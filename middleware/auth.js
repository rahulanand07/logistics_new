import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../utils/constant.js";
import User from "../models/user.js";


const authenticate_token = async(req,res,next)=>{
    let token = req.header("X-ACCESS-TOKEN")

    if(req.header("X-ACCESS-TOKEN") && req.header("X-ACCESS-TOKEN").split(" ")[0]==="Bearer"){
        token = req.header("X-ACCESS-TOKEN").split(" ")[1]
    }

    if(!token){
        return res.status(400).json({
            status:false,
            message:"Token missing or invalid"
        })
    }

    jwt.verify(token,SECRET_KEY,async(err,decoded)=>{
        if(err){
            return res.status(400).json({
                status:false,
                message:"Token missing or invalid"
            })
        }

        let user = await User.findOne({_id:decoded.id}).select('-password')

        if(!user){
            return res.status(400).json({
                status:false,
                message:"Invalid Token"
            })
        }

        req.user = user
        next()
    })
}

const role_auth = (roles) => {
    return (req, res, next) => {
        // console.log(req.user?.role,"-----")
      let role=req.user?.role
      if (!roles.includes(role)) {
        return res.status(400).json({
            status:false,
            message:`Role ${role} does not have access`
        })
      }
      next();
    };
  };

export {
    authenticate_token, role_auth
}