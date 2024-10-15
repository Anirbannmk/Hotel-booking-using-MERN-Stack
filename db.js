const mongoose=require("mongoose")
var mongourl='mongodb+srv://anirban:anirban4735@cluster0.qrptce1.mongodb.net/mern-rooms'
mongoose.connect(mongourl,{useUnifiedTopology:true,useNewUrlParser:true})
var connection=mongoose.connection
connection.on('error',()=>{
    console.log("Mongodb is Connection failed");
})
connection.on('connected',()=>{
    console.log("Mongodb connected successfullly");
})
module.exports=mongoose