import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CustomerSchema = new Schema(
    {
        customerName: {
            type: String,
            required: "Please enter your fullname."
        },
        phone: {
            type: Number
        },
        email: {
            type: String
            // unique: true,
            // required: true,
            // dropDups: true
        },
        address: {
            type: String
        },
        aadharNo: {
            type: String
        },
        password: {
            type: String
        },
        creationDate: {
            type: Date,
            default: Date.now
        }
    }
)