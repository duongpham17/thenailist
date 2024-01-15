import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import ClientModel from '@database/models/client';
import middleware from '../middleware';

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

    if (req.method === "PATCH") {
        const data = await ClientModel.findByIdAndUpdate(req.body._id, req.body, { new: true });

        return res
            .status(200)
            .json({
                data
            });
    };
};

export default middleware(handler);
