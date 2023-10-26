import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import CareersModel from '@database/models/careers';
import middleware from 'pages/middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "DELETE"){
        const data = await CareersModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data: data
            });
    };
}

export default middleware(handler);