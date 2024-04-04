import jwt from "jsonwebtoken"
import { SECRET_KEY } from "./constant.js";

const send_token = async(res, user, statusCode) => {
    let payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, `${SECRET_KEY}`);
  
    delete user._doc.password;
    return res.status(200).json({
      success: true,
      user,
      token,
    })
  };


  export {
    send_token
  }