import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface ITeamsApi {
    _id: string,
    images: string[],
    name: string,
    timestamp: number
}

export interface ITeams extends Partial<Document> {
    _id: Types.ObjectId,
    images: string[],
    name: string,
    timestamp: number
};

const schema = new Schema<ITeams>({
    images: [
        String 
    ],
    name: {
        type: String,
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Teams = mongoose.models.Teams || model<ITeams>('Teams', schema);

export default Teams;