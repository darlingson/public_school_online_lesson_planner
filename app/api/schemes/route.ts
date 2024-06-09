import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../(lib)/mongodb';
import Scheme from '../../(models)/Scheme';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const {title,email,subject,class_name,term,description,startDate,endDate,weekTopics} = await request.json();
    const newScheme = new Scheme({
      title,
      email,
      subject,
      class_name,
      term,
      description,
      startDate,
      endDate,
      weekTopics,
    });
    await newScheme.save();
    return NextResponse.json({ message: 'Scheme created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating scheme:', error);
    return NextResponse.json({ message: 'Error creating scheme' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userEmail = req.headers.get('user-email');
  if (!userEmail) {
      return NextResponse.json({ message: 'Email not found in header' }, { status: 400 });
  }
  try {
    await dbConnect();
    const schemes = await Scheme.find({ email: userEmail });
    return NextResponse.json(schemes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching schemes' }, { status: 500 });
  }
}