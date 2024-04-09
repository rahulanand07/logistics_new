import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../utils/constant";
import User from "../models/user";


const authenticate_token = async(req,res,next)=>{
    let token = req.headers["authorization"]

    if(req.headers.authorization && req.headers.authorization.split(" ")[0]==="Bearer"){
        token = req.headers.authorization.split(" ")[1]
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

export {
    authenticate_token
}