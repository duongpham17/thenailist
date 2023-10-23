import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface INewsApi {
    _id: string,
    images: string[],
    description: string,
    button: {href: string, name: string},
    timestamp: number
}

export interface INews extends Partial<Document> {
    _id: Types.ObjectId,
    images: string[],
    description: string,
    button: {href: string, name: string},
    timestamp: number
};

const NewsSchema = new Schema<INews>({
    images: [
        String 
    ],
    description: {
        type: String
    },
    button: {
        href: String,
        name: String,
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const News = mongoose.models.News || model<INews>('News', NewsSchema);

export default News;