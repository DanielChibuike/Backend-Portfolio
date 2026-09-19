import { Request,Response,NextFunction } from "express";

type AuthRequest = Request & {
    user?: {
        userId: string;
        role: string;}
    };

    const adminOnly = (req:AuthRequest, res:Response,next:NextFunction)=>{
        const role = req.user?.role;
        if(role !== "admin"){
            return res .status(403).json({message:"Access denied"});

        }
        next();

        };
        export = adminOnly;


    

