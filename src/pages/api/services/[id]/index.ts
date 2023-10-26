import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import ServicesModel from '@database/models/services';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "DELETE"){
        const data = await ServicesModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data
            });
    };

}

export default handler;