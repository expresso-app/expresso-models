/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator');

const User = require('./user-model');

const AddressSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    // GeoJSON
    type: {
        type: String,
        default: "Point",
        enum: ["Point"]
    },
    coordinates: [Number],
    address: {
        name: String,
        area: String,
        street: String,
        floor: String,
        building: String,
        apartment: String,
        mobile: String,
        instructions: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Address must be associated with an user!"]
    }
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;