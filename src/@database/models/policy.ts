import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IPolicyApi {
    _id: string,
    name: string,
    policy: {_id?: string, description: string}[],
    timestamp: number
}

export interface IPolicys extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    policy: {description: string}[],
    timestamp: number
};

const schema = new Schema<IPolicys>({
    name: {
        type: String
    },
    policy: [
        {
            description: String,
        }
    ],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Policys = mongoose.models.Policys || model<IPolicys>('Policys', schema);

export default Policys;