const mongoose = require("mongoose");


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODBATLASCONEX,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        

        });

        console.log("base de datos on line lo logre!!!");

    } catch (error) {
        console.log(error)
        throw new Error("error a la hora de iniciar la base de datos");
    }



}





module.exports = {

    dbConnection
}