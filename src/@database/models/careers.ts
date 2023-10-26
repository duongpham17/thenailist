import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface ICareersApi {
    _id: string,
    message: string,
    timestamp: number
};

export interface ICareers extends Partial<Document> {
    _id: Types.ObjectId,
    message: string,
    timestamp: number
};

const schema = new Schema<ICareers>({
    message: {
        type: String
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Careers = mongoose.models.Careers || model<ICareers>('Careers', schema);

export default Careers;