const Area = require("./models/area-model");
const Branch = require("./models/branch-model");
const City = require("./models/city-model");
const Country = require("./models/country-model");
const Menu = require("./models/menu-model");
const Restaurant = require("./models/restaurant-model");
const Tag = require("./models/tag-model");
const User = require("./models/user-model");
const MenuSection = require("./models/menuSection-model");
const MenuItem = require("./models/menuItem-model");

module.exports = {
    User,
    Country,
    City,
    Area,
    Tag,
    Restaurant,
    Branch,
    Menu,
    MenuSection,
    MenuItem
};