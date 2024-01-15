import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import ClientModel from '@database/models/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();

    if (req.method === "GET") {
        const data = await ClientModel.find().limit(1000).sort({ timestamp: -1 });

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "POST") {
        const data = await ClientModel.create(req.body);

        return res
            .status(200)
            .json({
                data
            });
    };
};

export default handler;
