import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface ITermsApi {
    _id: string,
    name: string,
    terms: {_id?: string, description: string}[],
    timestamp: number
}

export interface ITerms extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    terms: {description: string}[],
    timestamp: number
};

const schema = new Schema<ITerms>({
    name: {
        type: String
    },
    terms: [
        {
            description: String,
        }
    ],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Terms = mongoose.models.Terms || model<ITerms>('Terms', schema);

export default Terms;