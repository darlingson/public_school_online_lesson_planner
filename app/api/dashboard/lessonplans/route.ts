import dbConnect from "@/app/(lib)/mongodb";
import LessonPlan from "@/app/(models)/LessonPlan";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    await dbConnect();
    const userEmail = request.headers.get('user-email');
    if (!userEmail) {
        return NextResponse.json({ message: 'Email not provided' }, { status: 400 });
    }
    //the fetch should return the latest 5 lessonn Plans 
    try{
        const lessonPlans = await LessonPlan.find({ email: userEmail }).limit(5);
        console.log(lessonPlans);
        return NextResponse.json(lessonPlans);
    } catch(error){
        return NextResponse.json({ message: 'Error fetching lesson plans', error }, { status: 500 });
    }
}