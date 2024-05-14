import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
},{timestamps:true})

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;