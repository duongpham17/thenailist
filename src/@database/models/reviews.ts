import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IReviewsApi {
    _id: string,
    name: string,
    review: string,
    timestamp: number
}

export interface IReviews extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    review: string,
    timestamp: number
};

const schema = new Schema<IReviews>({
    name: {
        type: String
    },
    review:{
        type: String
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Reviews = mongoose.models.Reviews || model<IReviews>('Reviews', schema);

export default Reviews;