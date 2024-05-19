import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";

export async function GET(request){
  try {
    const teachers  = await Teacher.find();

    if(!teachers){
        return NextResponse.json({message:"No Teachers Found"},{status:"402"});
    }
    
    return NextResponse.json({message:"Teachers Found",teachers},{status:"200"});
    

  } catch (error) {
    console.log("GET All Teachers Error : ",error);
    return NextResponse.json({message:"Internal Server Error"},{status:"500"});
  }
}