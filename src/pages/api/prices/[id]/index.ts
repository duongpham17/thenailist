import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import PricesModel from '@database/models/prices';
import middleware from '../../middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

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


export default middleware(handler)