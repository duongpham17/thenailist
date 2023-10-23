import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import PolicyModel from '@database/models/policy';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "GET"){
        const data = await PolicyModel.find().sort({timestamp: -1});

        return res
            .status(200)
            .json({  
                data
            });
    };

    if(req.method === "POST"){
        const data = await PolicyModel.create(req.body);

        return res
            .status(200)
            .json({ 
                data
            });
    };

    if(req.method === "PATCH"){
        const data = await PolicyModel.findByIdAndUpdate(req.body._id, req.body, {new: true});

        return res
            .status(200)
            .json({ 
                data
            });
    };

}