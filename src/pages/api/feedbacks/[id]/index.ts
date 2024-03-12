import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import FeedbacksModel from '@database/models/feedbacks';
import middleware from '../../middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "DELETE"){
        const data = await FeedbacksModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data: data
            });
    };

}

export default middleware(handler)