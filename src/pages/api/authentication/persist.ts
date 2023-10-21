import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import UserModel from '@database/models/users';
import jwt from 'jsonwebtoken';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "GET"){

        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        };
    
        if(!token) return res.status(200).json({message: "Login to access these features"});
    
        const jwt_secret:any = process.env.JWT_SECRET;
    
        const decodedId:any = jwt.verify(token, jwt_secret);
    
        const existingUser = await UserModel.findById(decodedId.id);
    
        if(!existingUser) return res.status(200).json({message: "The user belonging to this token does not exist."});

        res.status(201).json({
            status: "success",
            data: existingUser
        });
        
    };

};