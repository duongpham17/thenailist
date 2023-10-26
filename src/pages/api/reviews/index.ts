import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import ReviewsModel from '@database/models/reviews';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "GET"){
        const data = await ReviewsModel.find().sort({timestamp: -1});

        return res
            .status(200)
            .json({  
                data
            });
    };

    if(req.method === "POST"){
        const data = await ReviewsModel.create(req.body);

        return res
            .status(200)
            .json({ 
                data
            });
    };

    if(req.method === "PATCH"){
        const data = await ReviewsModel.findByIdAndUpdate(req.body._id, req.body, {new: true});

        return res
            .status(200)
            .json({ 
                data
            });
    };

}

export default handler;