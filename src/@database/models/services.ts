import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IServicesApi {
    _id: string,
    href: string,
    description: string,
    name: string,
    images: string[],
    timestamp: number
}

export interface IServices extends Partial<Document> {
    _id: Types.ObjectId,
    href: string,
    description: string,
    name: string,
    images: string[],
    timestamp: number
};

const schema = new Schema<IServices>({
    href: {
        type: String,
    },
    description: {
        type: String
    },
    name: {
        type: String,
    },
    images: [
        String 
    ],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Services = mongoose.models.Services || model<IServices>('Services', schema);

export default Services;