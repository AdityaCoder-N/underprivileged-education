import connectToDatabase from "@/libs/db";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";

export async function POST(request){
    const {address,photo,phoneNumber,skills,userEmail,latitude,longitude,userId} = await request.json();
    
    try {
        await connectToDatabase();
        const teacher  = await Teacher.findById(userId)

        if(!teacher){
            return NextResponse.json({message:"Teacher Not Found"},{status:"402"})
        }

        teacher.address = address;
        teacher.photo=photo;
        teacher.phoneNumber = phoneNumber;
        teacher.skills=skills;
        teacher.location={
            latitude,longitude
        }

        await teacher.save();

        return NextResponse.json({message:"Teacher Details Updated",teacher},{status:"200"})

    } catch (error) {
        console.log("Upload Techer Deatails Error : ",error);
        return NextResponse.json({message:"Internal Server Error"},{status:"500"})
    }
}