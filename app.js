require("dotenv").config()
const express=require('express')
const app=express()
const bodyParser=require("body-parser")
const router=require("./routes/main")
const connectDB=require("./MongoDB/Connect")
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser() );
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api',router);

 

const port=process.env.PORT || 5000;
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`the server running on the port${port}`)
        })
    } catch (error) {
        console.log(error)
        
    }
}
start();
 