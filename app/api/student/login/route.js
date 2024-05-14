import * as bcrypt from 'bcrypt';
import connectToDatabase from "@/libs/db";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function POST(request){
    const {email,password,role} = await request.json();

    if(!email || !password || !role){
        return NextResponse.json({message:"Complete Data not Found"},{status:402});
    }

    try {

        await connectToDatabase();

        const user = await Student.findOne({email:email});
        if(!user){
            return NextResponse.json({message:"User Not Found"},{status:402});
        }

        const checkPass = bcrypt.compareSync(password,user.password);
        if(!checkPass){
            return NextResponse.json({message:"Wrong Credentials"},{status:400});
        }

        return NextResponse.json({message:"User Logged In",user:user},{status:200});
    
    } catch (error) {
        console.log("LOGIN_ERROR :",error);
        return NextResponse.json({message:"Internal Server Error"},{status:500});
    }
    
}