import { NextResponse } from 'next/server';
import dbConnect from '../../(lib)/mongodb';
import Scheme from '../../(models)/Scheme';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { title, description, startDate, endDate } = await request.json();
    const newScheme = new Scheme({
      title,
      description,
      startDate,
      endDate
    });
    await newScheme.save();
    return NextResponse.json({ message: 'Scheme created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating scheme' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const schemes = await Scheme.find();
    return NextResponse.json(schemes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching schemes' }, { status: 500 });
  }
}
