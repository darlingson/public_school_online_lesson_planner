import dbConnect from "@/app/(lib)/mongodb";
import LessonPlan from "@/app/(models)/LessonPlan";
import Scheme from "@/app/(models)/Scheme";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    await dbConnect();
    const userEmail = request.headers.get('user-email');
    if (!userEmail) {
        return NextResponse.json({ message: 'Email not provided' }, { status: 400 });
    } 
    try{
        const schemes = await Scheme.find({ email: userEmail }).limit(5);
        return NextResponse.json(schemes);
    } catch(error){
        return NextResponse.json({ message: 'Error fetching schemes', error }, { status: 500 });
    }
}