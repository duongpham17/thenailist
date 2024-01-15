import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import ClientModel from '@database/models/client';
import middleware from '../../middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "DELETE"){
        const data = await ClientModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data
            });
    };

}

export default middleware(handler);