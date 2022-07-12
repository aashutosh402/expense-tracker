const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://XGq6fu1bbsbLkTiE:WTFisthispasswordfu@cluster0.2ctmc.mongodb.net/test`,{useNewUrlParser:true,useUnifiedTopology:true})
const connection = mongoose.connection

connection.on("error",err=>console.log(err))
  
connection.on("connected",()=>console.log("mongodb connection successfull"))