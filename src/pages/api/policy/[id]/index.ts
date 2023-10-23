import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import PolicyModel from '@database/models/policy';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "DELETE"){
        const data = await PolicyModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data
            });
    };

}