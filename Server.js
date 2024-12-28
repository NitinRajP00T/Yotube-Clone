const express=require('express')
const dbConnect=require('./config/db');

const app=express();

require('dotenv').config;
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running ON port ${port}`);
})


const cookieParser = require('cookie-parser');          // Importing Cookie-Parser 
app.use(cookieParser());

const singUp=require("./routers/SingUp_loginRout");


const comment= require('./routers/CommnetRout');

const channel=require('./routers/ChannelMange')//{channel}-->TypeError: Router.use() requires a middleware function but got a undefined


app.use(express.json())  //middle ware to parse the req.body if we not used that showing the destructring ->userdefine-username,email,etc

app.use((req, resp, next) => {                     // Middleware that will log the request method and URL."
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Request Body:", req.body);
    next();
});
 dbConnect();

 app.use("/base",singUp);

 app.use("/base",comment);

app.use("/base",channel);






 