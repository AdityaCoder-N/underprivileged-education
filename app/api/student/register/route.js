import * as bcrypt from 'bcrypt';
import connectToDatabase from "@/libs/db";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function POST(request){
    const {name,email,password,role} = await request.json();

    if(!name || !email || !password || !role){
        return NextResponse.json({message:"Complete Data not Found"},{status:402});
    }

    try {

        await connectToDatabase();

        let user = await Student.findOne({email:email});
        if(user){
            return NextResponse.json({message:"User is already Registered"},{status:400});
        }

        const encryptedPass = bcrypt.hashSync(password, 10);
        user = await Student.create({
            name,email,password:encryptedPass,role
        });

        return NextResponse.json({message:"User Created",user:user},{status:200});

    } catch (error) {
        console.log("REGISTER_ERROR : ",error);
        return NextResponse.json({message:"Innternal Sever Error"},{status:500});

    }
    
}