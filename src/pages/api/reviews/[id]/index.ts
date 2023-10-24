import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import ReviewsModel from '@database/models/reviews';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "DELETE"){
        const data = await ReviewsModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data
            });
    };

}