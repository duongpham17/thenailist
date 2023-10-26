import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import AboutModel from '@database/models/about';
import middleware from '../middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();

    if (req.method === "GET") {
        const data = await AboutModel.find().sort({ timestamp: 1 });

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "POST") {
        const data = await AboutModel.create(req.body);

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "PATCH") {
        const data = await AboutModel.findByIdAndUpdate(req.body._id, req.body, { new: true });

        return res
            .status(200)
            .json({
                data
            });
    };
};

export default middleware(handler);

// middleware.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import UserModel from '@database/models/users';

// export default function myMiddleware(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
//   return async (req: NextApiRequest, res: NextApiResponse) => {

//     if(req.method === "GET") return await handler(req, res);

//     let token;

//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//       token = req.headers.authorization.split(' ')[1];
//     };

//     if(!token) return res.status(401).json({ message: 'Unauthorized' });;

//     const jwt_secret:any = process.env.JWT_SECRET;

//     const decodedId:any = jwt.verify(token, jwt_secret);

//     const existingUser = await UserModel.findById(decodedId.id);

//     if(!existingUser) return res.status(401).json({ message: 'Unauthorized' });

//     if(existingUser.role === "user") return res.status(401).json({ message: 'Unauthorized' }); 

//     await handler(req, res);
//   };
// }
