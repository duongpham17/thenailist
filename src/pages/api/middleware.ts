import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import UserModel from '@database/models/users';

export default function myMiddleware(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === "GET") return await handler(req, res);

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    };

    if(!token) return res.status(401).json({ message: 'Unauthorized' });;

    const jwt_secret:any = process.env.JWT_SECRET;

    const decodedId:any = jwt.verify(token, jwt_secret);

    const existingUser = await UserModel.findById(decodedId.id);

    if(!existingUser) return res.status(401).json({ message: 'Unauthorized' });

    if(existingUser.role === "user") return res.status(401).json({ message: 'Unauthorized' }); 

    await handler(req, res);
  };
}
