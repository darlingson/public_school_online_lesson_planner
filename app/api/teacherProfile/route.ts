import dbConnect from "@/app/(lib)/mongodb";
import Profile from "@/app/(models)/Profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { name, userName, userEmail, schoolType, schoolName, schoolCategory, subjects } = await request.json();
    await dbConnect();
    try{
        const teacherProfile = await Profile.create({
            name,
            userName,
            userEmail,
            schoolType,
            schoolName,
            schoolCategory,
            subjects
        });
        await teacherProfile.save();
        return NextResponse.json({ message: 'Profile created successfully' }, { status: 201 });
    }
    catch(error){
        console.error('Error creating profile:', error);
        return NextResponse.json({ message: 'Error creating profile' }, { status: 500 });
    }
}