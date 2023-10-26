import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import CareersModel from '@database/models/careers';
import middleware from 'pages/middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();

    if (req.method === "GET") {
        const data = await CareersModel.find().sort({ timestamp: 1 });

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "POST") {
        const data = await CareersModel.create(req.body);

        return res
            .status(200)
            .json({
                data
            });
    };

    if (req.method === "PATCH") {
        const data = await CareersModel.findByIdAndUpdate(req.body._id, req.body, { new: true });

        return res
            .status(200)
            .json({
                data
            });
    };
};

export default middleware(handler);
