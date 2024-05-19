import connectToDatabase from "@/libs/db";
import Donation from "@/models/Donation";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";

export async function POST(request){
    const {address,itemImage,userId,itemName,itemQuantity,itemCondition} = await request.json();

    if(!address || !itemImage || !userId || !itemName || !itemQuantity || !itemCondition){
        return NextResponse.json({message:"Complete Info Not Found"},{status:"402"})
    }

    try {
        await connectToDatabase();
        const teacher  = await Teacher.findById(userId);

        if(!teacher){
            return NextResponse.json({message:"Teacher Not Found"},{status:"402"})
        }

        const donation = await Donation.create({
            address,itemImage,itemName,itemQuantity,itemCondition,user:userId
        })
        teacher.donations.push(donation._id);
        await teacher.save();

        return NextResponse.json({message:"Donation Created"},{status:"200"})

    } catch (error) {
        console.log("Upload Donation Deatails Error : ",error);
        return NextResponse.json({message:"Internal Server Error"},{status:"500"})
    }
}