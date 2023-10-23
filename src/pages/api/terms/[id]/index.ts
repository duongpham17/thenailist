import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import TermsModel from '@database/models/terms';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "DELETE"){
        const data = await TermsModel.findByIdAndDelete(req.query.id);

        return res
            .status(200)
            .json({  
                data
            });
    };

}