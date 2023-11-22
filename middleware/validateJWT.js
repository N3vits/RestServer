import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";
const jwt = jsonwebtoken;

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if(!token){
        res.status(401).json({
            msg: 'Token not valid'
        })
    }
    try {

        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const user = await User.findById(uid);
        
        if(!user){
            return res.status(401).json({
                msg: 'Token not valid - User not found'
            })
        }

        if(!user.status){
            return res.status(401).json({
                msg: 'Token not valid - User whit status false'
            })
        }

        req.user = user;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        })
    }
}