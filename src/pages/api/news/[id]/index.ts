import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import NewsModel from '@database/models/news';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "DELETE"){
        const news = await NewsModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data: news
            });
    };

}