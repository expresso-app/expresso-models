/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Order = require('./order-model');
const MenuItem = require('./menuItem-model');
const MenuItemOption = require('./menuItemOption-model');
const MenuItemOptionItem = require('./menuItemOptionItem-model');

const orderItemSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: [true, "order item must be associated with an order!"]
    },
    menuItem: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItem",
        required: [true, "order item must be associated with a menu item!"]
    },
    quantity: {
        type: Number,
        required: [true, "You must enter a quantity!"]
    },
    notes: {
        type: String,
    },
    options: [
        {
            option: {
                type: mongoose.Schema.ObjectId,
                ref: "MenuItemOption",
            },
            // selection: [String],
            selection: [
                {
                    optionItem: {
                        type: mongoose.Schema.ObjectId,
                        ref: "MenuItemOptionItem"
                    }
                }
            ]
        }
    ]
});

// embed order as a child document
// orderItemSchema.pre("save", async function (next) {
//     const order = await Order.findOne({ id: this.order });
//     this.order = order;

//     next();
// });

// embed menu item as a child document
// orderItemSchema.pre("save", async function (next) {
//     const menuItem = await MenuItem.findOne({ id: this.menuItem });
//     this.menuItem = menuItem;

//     next();
// });

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;