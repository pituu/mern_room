const mongoose=require('mongoose');
var mongoURL="mongodb+srv://pitumondala:oVj86YXo5oa8DoP1@cluster0.hgdeein.mongodb.net/GoldenRooms?retryWrites=true&w=majority";
mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true});
var connection=mongoose.connection;
connection.on('error',()=>{
    console.log('db connectoing failed');
})
connection.on('connected',()=>{
    console.log('db connection successful');
})
module.exports=mongoose;