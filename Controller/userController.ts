const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { Request,Response}from "express";

const createUser = async (req: Request,res:Response) =>{

    try{

    const{name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please Provide All required fields"});

    }
    /*check if email exist*/
    const existingEmail = await User.findOne({email});
    if(existingEmail){
      return res.status(400).json({message:"email already exist"});
    }
    /* hash password*/
    
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
     name,
     email,
     password:hashedPassword

    })
    await user.save();
   const { password: _, ...safeUser } = user.toObject();
    return res.status(201).json({message:"user created successfully",user:safeUser});

    }catch(error:unknown){
        console.error("error creating user",error);
        if(typeof error ==="object" &&
            error !== null &&
            "name" in error &&
            error.name === "CastError" 
        ){
            return res.status(400).json({message:"invaid user data"});

        }
      return res.status(500).json({message:"internal server error"});

    }
}; 

/* login user */

const loginUser = async (req:Request, res:Response) =>{
    try{
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({message:"provide the required field"});

        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"user doesnt exist"});
        }
       const matchingPassword = await bcrypt.compare(password,user.password);
       if(!matchingPassword){
        return res.status(401).json({message:"wrong password"});

       }
       const secret = process.env.JWT_SECRET;
       if(!secret){
        return res.status(500).json({message:"JWT not configured"})

       }
       const token = jwt.sign(
        {
            userId:user._id,
            role:user.role
        },
        secret,
        {
          expiresIn:"2h"
        }
       )
       return res.status(200).json({message:"Login Succesfull",token});

    }catch (error:unknown){
        console.error("error logging in a user",error);

        if( typeof error ==="object" &&
            error !== null &&
            "name" in error &&
            error.name ==="CastError"
        ){
        return res.status(400).json({message:"Invalid user data"});
        }
        return res.status(500).json({messgae:"Internal server error"});
    }


};

module.exports ={
    createUser,
    loginUser
}