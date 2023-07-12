import { Schema, model } from "mongoose";

const urlRecordSchema = new Schema(
    {

        fullUrl: {
            type: String,
            require: [true, 'fullUrl is required']
        },
        shortUrl: {
            type: String,
            require: [true, 'shortUrl is required'],
            unique: true
        },
        visitCount:{
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

const UrlRecord = model('UrlRecord', urlRecordSchema)

export default UrlRecord;

