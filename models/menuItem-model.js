/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator');

const MenuSection = require("./menuSection-model");
const MenuItemOption = require("./menuItemOption-model");

const menuItemSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Menu Item must have a name!"]
        },
        price: {
            type: Number,
            required: [true, "Menu Item must have a price!"]
        },
        description: {
            type: String,
            required: [true, "Menu Item must have a description!"]
        },
        image: String,
        options: Array,
        menuSection: {
            type: mongoose.Schema.ObjectId,
            ref: "MenuSection",
            required: [true, "Menu Item must be associated with a menu section!"]
        },
    }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// // embed menu section object as a child document
// menuItemSchema.pre("save", async function(next) {
//     const menuSection = await MenuSection.findOne({ id: this.menuSection });
//     this.menuSection = menuSection;

//     next();
// });

// reference menu (parent) documnet vai populate()
menuItemSchema.pre(/^find/, async function(next) {
    this.populate({
        path: "menuSection",
        select: "-__v -createdAt -menuItems"
    });

    next();
});

// embed areas collection as a child documents
menuItemSchema.pre("save", async function(next) {
    const optionPromises = this.options.map(async id => await MenuItemOption.findOne({ id: id }));
    this.options = await Promise.all(optionPromises);

    // eslint-disable-next-line no-return-assign
    this.options.forEach(opt => opt.menuItem = undefined);

    next();
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;