import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import TeamModel from '@database/models/teams';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {


    await connectDB();

    if(req.method === "DELETE"){
        const data = await TeamModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data: data
            });
    };

}

export default handler;
