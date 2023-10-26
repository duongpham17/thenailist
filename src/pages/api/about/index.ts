import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import AboutModel from '@database/models/about';
import middleware from '../middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();

    if (req.method === "GET") {
        const data = await AboutModel.find().sort({ timestamp: 1 });

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "POST") {
        const data = await AboutModel.create(req.body);

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "PATCH") {
        const data = await AboutModel.findByIdAndUpdate(req.body._id, req.body, { new: true });

        return res
            .status(200)
            .json({
                data
            });
    };
};

export default middleware(handler);
