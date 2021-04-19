/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./user-model');
const Branch = require('./branch-model');
const Address = require('./address-model');
const OrderItem = require('./orderItem-model');

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Order must be associated with a user!"]
    },
    branch: {
        type: mongoose.Schema.ObjectId,
        ref: "Branch",
        required: [true, "Order must be associated with a branch!"]
    },
    deliveryAddress: {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
        required: [true, "Order must be associated with a delivery address!"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    subTotal: {
        type: Number,
        required: [true, "Order must have a sub total!"]
    },
    deliveryFee: {
        type: Number,
        required: [true, "Order must have a delivery fee!"]
    },
    total: {
        type: Number,
        required: [true, "Order must have a total!"]
    },
    paid: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    // orderItems: Array
});


/* DOCUMENT MIDDLEWARE */
// embed user as a child document
// orderSchema.pre("save", async function (next) {
//     const user = await User.findOne({ id: this.user });
//     this.user = user;

//     next();
// });


/* QUERY MIDDLEWARE */

// reference user (parent) documnet vai populate()
orderSchema.pre(/^find/, async function(next) {
    this.populate({
        path: "user",
        select: "-__v"
    });

    next();
});

// reference branch (parent) documnet vai populate()
orderSchema.pre(/^find/, async function(next) {
    this.populate({
        path: "branch",
        select: "-__v"
    });

    next();
});

// reference delivery address (parent) documnet vai populate()
orderSchema.pre(/^find/, async function(next) {
    this.populate({
        path: "deliveryAddress",
        select: "-__v"
    });

    next();
});


// embed order items collection as a child documents
// orderSchema.pre("save", async function(next) {
//     const oredrItemPromises = this.orderItems.map(async id => await OrderItem.findOne({ id: id }));
//     this.orderItems = await Promise.all(oredrItemPromises);

//     // eslint-disable-next-line no-return-assign
//     this.orderItems.forEach(oi => oi.order = undefined);

//     next();
// });


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;