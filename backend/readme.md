### Backend step by step configuration 
- create backend folder 
- install node packetmanagers `npm i init ` you can add every things or go to defaults 
- install express and mongoose for storage and backend setup
- configuration Mongodb atls 
- error set IP, and URL with username and passeword trableshoots
```Mongoose 

import mongoose from "mongoose";


const connectDB = async()=>{
    try{
        const dataBD = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected database",dataBD.connection.host)
    }catch(error){
        console.log("error :", error)
    }
}

export default connectDB;

```
- 