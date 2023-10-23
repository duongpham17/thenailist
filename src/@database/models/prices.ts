import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IPricesApi {
    _id: string,
    name: string,
    prices: {_id?: string, name: string, price: number, discount: number}[],
    timestamp: number
}

export interface IPrices extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    prices: {name: string, price: number, discount: number}[],
    timestamp: number
};

const schema = new Schema<IPrices>({
    name: {
        type: String,
    },
    prices: [{
        name: String,
        price: Number,
        discount: Number,
    }],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Prices = mongoose.models.Prices || model<IPrices>('Prices', schema);

export default Prices;