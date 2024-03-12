import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IFeedbacksApi {
    _id: string,
    name: string,
    feedback: string,
    email: string,
    timestamp: number
};

export interface IFeedbacks extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    feedback: string,
    email: string,
    timestamp: number
};

const schema = new Schema<IFeedbacks>({
    name: {
        type: String,
    },
    feedback: {
        type: String
    },
    email: {
        type: String,
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Feedbacks = mongoose.models.Feedbacks || model<IFeedbacks>('Feedbacks', schema);

export default Feedbacks;