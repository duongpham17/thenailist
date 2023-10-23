import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import NewsModel from '@database/models/news';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "GET"){
        const news = await NewsModel.find().sort({timestamp: -1});

        return res
            .status(200)
            .json({  
                data: news
            });
    };

    if(req.method === "POST"){
        const news = await NewsModel.create(req.body);

        return res
            .status(200)
            .json({ 
                data: news
            });
    };

    if(req.method === "PATCH"){
        const news = await NewsModel.findByIdAndUpdate(req.body._id, req.body, {new: true});

        return res
            .status(200)
            .json({ 
                data: news
            });
    };

}