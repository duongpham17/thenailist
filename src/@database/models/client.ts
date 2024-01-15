import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IClientApi {
    _id: string,
    email: string,
    phone: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    address: string,
    city: string,
    postcode: string,
    medical_history: string,
    marketing: boolean,
    timestamp: number
};

export interface IClient extends Partial<Document> {
    _id: Types.ObjectId,
    email: string,
    phone: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    address: string,
    city: string,
    postcode: string,
    medical_history: string,
    marketing: boolean,
    timestamp: number
};

const schema = new Schema<IClient>({
    email: {
        type: String
    },
    phone: {
        type: String,
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    postcode: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    medical_history: {
        type: String,
    },
    marketing: {
        type: Boolean
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Client = mongoose.models.Client || model<IClient>('Client', schema);

export default Client;