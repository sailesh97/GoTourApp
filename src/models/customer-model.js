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
        phone: Number,
        email: {
            type: String,
            unique: true
        },
        address: String,
        aadharNo: {
            type: String,
            unique: true
        },
        password: String,
        creationDate: {
            type: Date,
            default: Date.now
        }
    }
)

CustomerSchema.plugin(uniqueValidator);

export default CustomerSchema;