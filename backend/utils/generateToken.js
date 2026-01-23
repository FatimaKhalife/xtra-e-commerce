import jwt from "jsonwebtoken";

export const generateToken=(id,remember=false)=>{
    const expiresIn =remember? "30d":"2h";
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn});
};