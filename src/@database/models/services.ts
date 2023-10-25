import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IServicesApi {
    _id: string,
    name: string,
    items: [{
        _id?: string,
        name: string,
        description: string,
        images: string[],
        button: { href: string, name: string }
    }],
    timestamp: number
}

export interface IServices extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    items: [{
        name: string,
        description: string,
        images: string[],
        button: { href: string, name: string }
    }],
    timestamp: number
};

const schema = new Schema<IServices>({
    name: {
        type: String,
    },
    items: [{
        name: String,
        description: String,
        images: [],
        button: {href: String, name: String}
    }],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Services = mongoose.models.Services || model<IServices>('Services', schema);

export default Services;