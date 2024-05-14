import mongoose, { Schema } from "mongoose";

const TeacherSchema = new Schema({
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

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);

export default Teacher;