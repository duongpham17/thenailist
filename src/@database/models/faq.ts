import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IFaqApi {
    _id: string,
    name: string,
    questions: {_id?: string, question: string, answer: string}[],
    timestamp: number
};

export interface IFaq extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    questions: {question: string, answer: string}[],
    timestamp: number
};

const schema = new Schema<IFaq>({
    name: {
        type: String
    },
    questions: [
        {
            question: String,
            answer: String
        }
    ],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Questions = mongoose.models.Questions || model<IFaq>('Questions', schema);

export default Questions;