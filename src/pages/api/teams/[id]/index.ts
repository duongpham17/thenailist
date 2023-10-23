import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import TeamModel from '@database/models/teams';

export default async function(req: NextApiRequest, res: NextApiResponse){

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