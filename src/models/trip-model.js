import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TripSchema = new Schema(
    {
        destinationName: {
            type: String,
            required: "Please enter your destinationName."
        },
        placesToVisit: [{
            type: String
        }],
        price: {
            type: Number
        },
        daysOfTravel: {
            type: Number
        },
        noOfRooms: {
            type: Number
        },
        noOfAdults: {
            type: Number
        },
        noOfChildren: {
            type: Number
        },
        roomType: {
            type: String
        }
    }
)