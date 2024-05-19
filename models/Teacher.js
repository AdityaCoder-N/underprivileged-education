import mongoose, { Schema } from "mongoose";

const TeacherSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    donations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Donation',
        required:false
    }],
    address:{
        type:String,
        required:false
    },
    phoneNumber:{
        type:String,
        required:false
    },
    photo:{
        type:String,
        required:false
    },
    skills:[String],
    location:{
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    }
},{timestamps:true})

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);

export default Teacher;