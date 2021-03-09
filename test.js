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
}


test();
