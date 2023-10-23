import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IAboutApi {
    _id: string,
    images: string[],
    description: string,
    button: {href: string, name: string},
    timestamp: number
}

export interface IAbout extends Partial<Document> {
    _id: Types.ObjectId,
    images: string[],
    description: string,
    button: {href: string, name: string},
    timestamp: number
};

const schema = new Schema<IAbout>({
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

const About = mongoose.models.About || model<IAbout>('About', schema);

export default About;