const mongoose = require("mongoose");
const models = require("./index");

const connectionString = "mongodb://127.0.0.1:27017/expresso";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(conn => {
    // console.log(conn.connections); 
    console.log("DB Connection Successful.")
})
.catch(err => {
    console.error(err);
    console.log("Unable to connect to DB.");
    process.exit(1);
});



async function test() {
    // const tag = new models.Tag();
    // console.log(tag.constructor);


    // const menuItemOption = await models.MenuItemOption.create({
    //     name: "test option",
    //     type: "Required",
    //     menuItem: "602746efee637f294c112c71"
    // });
    // console.log("menuItemOption" + menuItemOption);

    // const category = await models.Category.create({ name: "test category"});
    // console.log(category);

    const userId = "1f227f4b-0778-4e2a-b11b-8846c0d7dc8c";
    // const order = await models.Order.create({
    //     user: userId
    // });
    // console.log(order);

    const orderId = "2d473f8f-53a4-4298-b324-76dc164d8519";
    const menuItemId = "1bc84e76-1aec-494a-a2ee-b77482b43a55";
    // const orderItem = await models.OrderItem.create({
    //     order: orderId,
    //     menuItem: menuItemId,
    //     quantity: 3
    // });
    // console.log(orderItem);

    const menuSection = await models.MenuSection.findOne({id:"89df0712-493a-4311-a526-ce1900f9d085"});
    // console.log(menuSection._id);

    // const menuItem = await models.MenuItem.create({
    //     name: "test",
    //     price: 60,
    //     description: "jdjdjd",
    //     menuSection: menuSection._id,
    //     //options: []
    // });
    // console.log(menuItem);


    /* ORDERS */
    const user = "5f2246671c8f05286867dd3f";
    const branch = "602b64aec8c4730e4854ad10";
    const deliveryAddress = "60706a1e4d30c03dccb5afd7";

    // const order = await models.Order.create({
    //     user,
    //     branch,
    //     deliveryAddress,
    //     subTotal: 250,
    //     deliveryFee: 20,
    //     total: 270,
    // });

    const order_id = "607cbb50bb26002ff0157444";

    const order = await models.Order.findById(order_id);
    // console.log(`${order.user.firstName} ${order.user.lastName}`);
    // console.log(order.branch.name);
    // console.log(order.deliveryAddress.address.name);
    // console.log(order.createdAt);

    const orderItemData = {
        order: order_id,
        menuItem: "602b6930c13d66111023a393",
        quantity: 2,
        notes: "served asap!!!",
        options: [
            {
                option: "602b6c1ae6873343c4701138",
                // selection: ["604f064079ecda119c8554c4"]
                selection: [
                    {
                        optionItem: "604f064079ecda119c8554c4"
                    }
                ]
            },
            {
                option: "604ff551ebdc1c4064067d76",
                // selection: ["604ff561ebdc1c4064067d78", "604ff574ebdc1c4064067d79"]
                selection: [
                    {
                        optionItem: "604ff561ebdc1c4064067d78"
                    },
                    {
                        optionItem: "604ff574ebdc1c4064067d79"
                    }
                ]
            }
        ]
    };

    // const orderItem = await models.OrderItem.create(orderItemData);

    const orderItemId = "607cc69622c8750ff01ad9c8";
    const orderItem = await models.OrderItem.findById(orderItemId);
    console.log(orderItem);
}


test();
