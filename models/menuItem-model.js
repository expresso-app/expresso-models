/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator');

const MenuSection = require("./menuSection-model");

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
        options: [
            {
                id: {
                    type: String,
                    default: uuidv4,
                    unique: true,
                },
                name: String,
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
                        name: String,
                        value: Number
                    }
                ]
            }
        ],
        menuSection: {
            type: Object,
            required: [true, "Menu Item must be associated with a menu section!"]
        },
    }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// embed menu section object as a child document
menuSchema.pre("save", async function(next) {
    const menuSection = await MenuSection.findOne({ id: this.menuSection });
    this.menuSection = menuSection;

    next();
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;