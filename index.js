const Area = require("./models/area-model");
const Branch = require("./models/branch-model");
const City = require("./models/city-model");
const Country = require("./models/country-model");
const Menu = require("./models/menu-model");
const Category = require("./models/category-model");
const Restaurant = require("./models/restaurant-model");
const Tag = require("./models/tag-model");
const User = require("./models/user-model");
const Address = require("./models/address-model");
const MenuSection = require("./models/menuSection-model");
const MenuItem = require("./models/menuItem-model");
const MenuItemOption = require("./models/menuItemOption-model");
const MenuItemOptionItem = require("./models/menuItemOptionItem-model");
const Order = require("./models/order-model");
const OrderItem = require("./models/orderItem-model");

module.exports = {
    User,
    Address,
    Country,
    City,
    Area,
    Tag,
    Category,
    Restaurant,
    Branch,
    Menu,
    MenuSection,
    MenuItem,
    MenuItemOption,
    MenuItemOptionItem,
    Order,
    OrderItem
};