require("dotenv").config();

const express=require('express');
const app=express();
const dbconfig=require('./db');
const userrouter = require('./router/userrouter');
const roomroute=require('./router/roomrouter');
const bookingrouter=require('./router/bookingrouter');
var cors = require('cors')
const path=require('path');
app.use(express.json());
app.use(cors({ 
    origin: "https://golden-rooms-syqd.onrender.com", 
    credentials: true 
   }));
app.use('/api/rooms',roomroute);
app.use('/',userrouter);
app.use('/',bookingrouter);
//----------------------Deployment------------------------------------------
 const __dirname1=path.resolve()
 console.log(__dirname1)
 if(process.env.ENV==="production"){
    app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>{
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
 })
}
 else {
    app.get("/", (req, res) => {
      res.send("API is running..");
    });
  }
//----------------------Deployment------------------------------------------
const port=process.env.PORT||8080;
app.listen(port,()=>{console.log(`server is running on port ${port}`)});
// pitumondala
// oVj86YXo5oa8DoP1