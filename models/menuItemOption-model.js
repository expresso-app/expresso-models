/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator');

const menuItemOptionSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Menu Item Option must have a name!"]
    },
    type: {
        type: String,
        enum: ["Required", "Optional"]
    },
    optionItems: [
        {
            id: {
                type: String,
                default: uuidv4,
                unique: true,
            },
            name: {
                type: String,
                required: [true, "Menu Item Option Item must have a name!"]
            },
            value: {
                type: Number,
                required: [true, "Menu Item Option Item must have a value!"]
            },
        }
    ],
    menuItem: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItem",
        required: [true, "Menu Item Option must be associated with a Menu Item!"]
    },
});

const MenuItemOption = mongoose.model('MenuItemOption', menuItemOptionSchema);

module.exports = MenuItemOption;