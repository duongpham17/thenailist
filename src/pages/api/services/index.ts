import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import ServicesModel from '@database/models/services';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "GET"){
        const data = await ServicesModel.find().sort({timestamp: -1});

        return res
            .status(200)
            .json({  
                data
            });
    };

    if(req.method === "POST"){
        const data = await ServicesModel.create(req.body);

        return res
            .status(200)
            .json({ 
                data
            });
    };

    if(req.method === "PATCH"){
        const data = await ServicesModel.findByIdAndUpdate(req.body._id, req.body, {new: true});

        return res
            .status(200)
            .json({ 
                data
            });
    };

}

export default handler;