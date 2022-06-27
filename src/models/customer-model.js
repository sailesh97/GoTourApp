import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        customerName: {
            type: String,
            required: "Please enter your fullname.",
            unique: true
        },
        phone: {
            type: Number
        },
        email: {
            type: String,
            unique: true
            // required: true,
            // dropDups: true
        },
        address: {
            type: String
        },
        aadharNo: {
            type: String,
            unique: true
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

CustomerSchema.plugin(uniqueValidator);

export default CustomerSchema;