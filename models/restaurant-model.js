/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator')

// const Menu = require('./menu-model');
const Tag = require('./tag-model');

const restaurantSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        // default: () => uuidv4(),
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Restaurant must have a name!'],
        trim: true,
        unique: false,
        maxlength: [50, "Restaurant must have less than or equal 50 characters!"]
    },
    slogan: {
        type: String,
        required: [true, 'Restaurant must have a slogan!'],
        trim: true,
        unique: false,
    },
    deliveryTime: {
        type: Number,
        validate: {
            message: "delivery time ({VALUE}) must be less than 60!",
            validator: function (val) {
                return val < 60;
            }
        }
    },
    deliveryFee: Number,
    specialOffers: Boolean,
    logo: String,
    image: String,
    rating: {
        type: Number,
        default: 0,
        max: [5, "rating must be below 5.0!"],
    },
    slug: {
        type: String,
        validate: {
            validator: (val) => validator.isSlug(val),
            message: "slug ({VALUE}) is not a valid slug!"
        }
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    tags: Array,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Restaurant must be associated with a category!"]
    },
    // level: {
    //     type: String,
    //     required: [true, "Restaurant must have a level!"],
    //     enum: {
    //         values: ["A", "B", "C"],
    //         message: "Level is either A, B or C!"
    //     }
    // },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// single-field index
restaurantSchema.index({ deliveryTime: 1 });
restaurantSchema.index({ slug: 1 });

// compound index
restaurantSchema.index({ deliveryTime: 1, deliveryFee: -1 });


// virtual properties
restaurantSchema.virtual("deliveryRate").get(function () {
    return (this.deliveryFee / this.deliveryTime).toFixed(2) * 1;
});

//// virtual populate
// restaurantSchema.virtual("branches", {
//     ref: "Branch",
//     foreignField: "restaurant",
//     localField: "_id"
// });


// Document middleware: runs BEFORE .save() and .create()
restaurantSchema.pre("save", function (next) {
    // eslint-disable-next-line prefer-destructuring
    this.slug = slugify(this.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });
    next();
});

// tags array as a child collection
restaurantSchema.pre("save", async function (next) {
    const tagPromises = this.tags.map(async id => await Tag.findOne({ id: id }));
    this.tags = await Promise.all(tagPromises);

    next();
});

// // embed menu object as a child document
// restaurantSchema.pre("save", async function(next) {
//     const menu = await Menu.findOne({ id: this.menu });
//     this.menu = menu;

//     next();
// });

// reference category (parent) documnet vai populate()
restaurantSchema.pre(/^find/, async function(next) {
    this.populate({
        path: "category",
        select: "-__v"
    });

    next();
});

// Document middleware: runs AFTER .save() and .create()
restaurantSchema.post("save", function (doc, next) {
    //console.log(doc);
    next();
});

// Query middleware: runs BEFORE .find(), findOne() and findOneAnd...()
restaurantSchema.pre(/^find/, function (next) {
    // this.find({ specialOffers: { $ne: false } })
    next();
});

// Query middleware: runs AFTER .find(), findOne() and findOneAnd...()
restaurantSchema.post(/^find/, function (docs, next) {
    // console.log(docs);
    next();
});

// Aggregate middleware: runs BEFORE .aggregate()
restaurantSchema.pre("aggregate", function (next) {
    // console.log(this.pipeline());
    next();
});


const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;