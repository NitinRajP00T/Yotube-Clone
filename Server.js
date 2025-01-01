const express=require('express')
const dbConnect=require('./config/db');
 const cloudinary=require('./config/cloud');
const fileUpload=require('express-fileupload');

const app=express();

require('dotenv').config();
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running ON port ${port}`);
})


const cookieParser = require('cookie-parser');          // Importing Cookie-Parser 
app.use(cookieParser());



//importinga all route-->
const singUp=require("./routers/SingUp_loginRout");


const comment= require('./routers/CommnetRout');

const channel=require('./routers/ChannelMange')//{channel}-->TypeError: Router.use() requires a middleware function but got a undefined

const video=require('./routers/VideoMange')

app.use(express.json())  //middle ware to parse the req.body if we not used that showing the destructring ->userdefine-username,email,etc
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}));


app.use((req, resp, next) => {                     // Middleware that will log the request method and URL."
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Request Body:", req.body);
    console.log("requested file",req.files)
    next();
});



app.use("/base",singUp);

app.use("/base",comment);

app.use("/base",channel);

app.use("/base",video)


dbConnect();

cloudinary.cloudinaryConnect();




 