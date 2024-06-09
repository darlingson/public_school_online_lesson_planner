import Profile from "@/app/(models)/Profile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const userEmail = req.headers.get('user-email');
    if (!userEmail) {
        return NextResponse.json({ message: 'Email not found in header' }, { status: 400 });
    }
    try{
        const teacherProfile = await Profile.findOne({userEmail: userEmail});
        // console.log(teacherProfile)
        return NextResponse.json(teacherProfile, { status: 200 });
    }
    catch(error){
        console.error('Error fetching profile:', error);
        return NextResponse.json({ message: 'Error fetching profile' }, { status: 500 });
    }
}