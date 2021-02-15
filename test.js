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


    const menuItemOption = await models.MenuItemOption.create({
        name: "test option",
        type: "Required",
        menuItem: "602746efee637f294c112c71"
    });

    console.log("menuItemOption" + menuItemOption);
}


test();
