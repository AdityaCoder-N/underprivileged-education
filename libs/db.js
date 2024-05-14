import mongoose from "mongoose";

const connectToDatabase = async()=>{
    if(mongoose.connections[0].readyState){
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected to DB");
    } catch (error) {
        console.log("DB_ERROR",error);
    }
}

export default connectToDatabase;