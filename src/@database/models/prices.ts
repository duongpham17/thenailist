import mongoose, { Types, Schema, model, Document } from 'mongoose';

export interface IPricesApi {
    _id: string,
    name: string,
    headers: { 
        first: string, 
        second: string
    },
    prices: { 
        _id?: string, 
        name: string, 
        small: string, 
        discount: number, 
        hfirst: number, 
        hsecond: number
    }[],
    timestamp: number,
}

export interface IPrices extends Partial<Document> {
    _id: Types.ObjectId,
    name: string,
    headers: { 
        first: string, 
        second: string
    },
    prices: { 
        name: string, 
        small: string, 
        discount: number, 
        hfirst: number, 
        hsecond: number
    }[],
    timestamp: number
};

const schema = new Schema<IPrices>({
    name: {
        type: String,
    },
    headers:{
        first: String,
        second: String
    },
    prices: [{
        name: String,
        small: String,
        discount: Number,
        hfirst: Number,
        hsecond: Number,
    }],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Prices = mongoose.models.Prices || model<IPrices>('Prices', schema);

export default Prices;