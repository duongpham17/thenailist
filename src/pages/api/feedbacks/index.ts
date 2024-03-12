import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import FeedbacksModel from '@database/models/feedbacks';
import middleware from '../middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();

    if (req.method === "GET") {
        const data = await FeedbacksModel.find().sort({ timestamp: -1 });

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "POST") {
        const data = await FeedbacksModel.create(req.body);

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "PATCH") {
        const data = await FeedbacksModel.findByIdAndUpdate(req.body._id, req.body, { new: true });

        return res
            .status(200)
            .json({
                data
            });
    };
};

export default middleware(handler);