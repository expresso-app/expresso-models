/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator');

const menuItemOptionItemSchema = new mongoose.Schema({
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
    option: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItemOption",
        required: [true, "MenuItem OptionItem must be associated with a menuItem Option!"]
    }
});


const MenuItemOptionItem = mongoose.model('MenuItemOptionItem', menuItemOptionItemSchema);

module.exports = MenuItemOptionItem;