import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require('dotenv').config()


import CustomerSchema from '../models/customer-model';
import { TripSchema } from '../models/trip-model';
import { hash } from '../utilities/hashing';

const Customer = mongoose.model('user', CustomerSchema);
const Trip = mongoose.model('tripdetailsnew', TripSchema);

async function compare(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

// add customer - with encryption
export const addCustomer = async (req, res) => {
    let customer = req.body;
    // console.log("-------------------------------------Customer-------------------------------------/n",customer)
    customer.password = await hash(customer.password);
    let newCustomer = new Customer(customer);
    try {
        let returnedCustomer = await newCustomer.save();
        res.send(returnedCustomer);
    } catch (err) {
        if(err.message){
            res.send({
                error: err._message,
                message: err.message
            })
        }
        res.send(err);
    }
}

export const signIn = async (req, res) => {
    try {
        let returnedCustomer = await Customer.findOne({ email: req.body.email });
        const validateCustomer = await compare(req.body.password, returnedCustomer.password);

        if (validateCustomer) {
            const user = req.body;
            const token = jwt.sign({user}, process.env.JWT_SECRET);
            res.send({ message: 'User Validated', token: token, customer: returnedCustomer });
        } else{
            res.send({ message: "Sorry not validate credentials :" + req.body.email });
        }
    } catch (err) {
        res.send({ message: "Error Authenticating :" + req.body.email });
    }
}

export const ensureToken = (req, res, next) => {
    // check for valid token

    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else{
        console.log("Error happened")
        res.sendStatus(403);
    }
}

export const getProtectedInfo = (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
            console.log(err);
            res.sendStatus(403);
        } else{
            // console.log("TripData--", data)
            getAllTrips(res);
            
            // res.json({
            //     msg: "This is a protected route",
            //     data: data
            // })
        }
    });
}

function getAllTrips(res) {
    Trip.find({}, (err, tripPackagedProvided) => {
        if (err) {
            res.send(err);
        }
        console.log("Protected  Response", err, tripPackagedProvided)
        res.json(tripPackagedProvided);
    });
}

export const home = (req, res) => {
    res.json({ "message": "Welcome from Express" });
}