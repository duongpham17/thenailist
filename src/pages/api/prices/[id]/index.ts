import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import PricesModel from '@database/models/prices';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "DELETE"){
        const data = await PricesModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data
            });
    };

}