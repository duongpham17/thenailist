import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IGalleryApi {
    _id: string,
    name: string,
    src: string[],
    timestamp: number
};

export interface IGallery extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    src: string[],
    timestamp: number
};

const schema = new Schema<IGallery>({
    name: {
        type: String
    },
    src: [{
        type: String
    }],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Gallery = mongoose.models.Gallery || model<IGallery>('Gallery', schema);

export default Gallery;