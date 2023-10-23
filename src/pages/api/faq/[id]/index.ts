import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import FaqModel from '@database/models/faq';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "DELETE"){
        const data = await FaqModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data
            });
    };

}