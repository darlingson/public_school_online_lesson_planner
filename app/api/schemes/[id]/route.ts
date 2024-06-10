import Scheme from '@/app/(models)/Scheme';

import mongoose, { Schema } from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const userEmail = request.headers.get('user-email');
    if (!userEmail) {
        return NextResponse.json({ message: 'Email not provided' }, { status: 400 });
    }
  try {
    const scheme = await Scheme.findById(params.id);
    if (!scheme) {
      return NextResponse.json({ message: 'Scheme not found' }, { status: 404 });
    }
    return NextResponse.json(scheme);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to get scheme' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    console.log(body);
    const updatedScheme = await innerScheme.findOneAndUpdate({ _id: body._id }, body, { new: true });
    if (!updatedScheme) {
      return NextResponse.json({ message: 'Scheme not found' }, { status: 404 });
    }
    return NextResponse.json(updatedScheme);
  } catch (error) {
    console.error('Error updating scheme:', error);
    return NextResponse.json({ message: 'Failed to update scheme' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deletedScheme = await Scheme.findByIdAndDelete(params.id);
    if (!deletedScheme) {
      return NextResponse.json({ message: 'Scheme not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete scheme' }, { status: 500 });
  }
}


interface IScheme extends Document {
    _id: string;
    title: string;
    email: string;
    subject: string;
    class_name: string;
    term: string;
    description: string;
    startDate: string;
    endDate: string;
    weekTopics: Array<{
      week: number;
      topic: string;
      objectives: string;
      resources: string;
      assessment: string;
    }>;
  }
  
  const WeekTopicSchema: Schema = new Schema({
    week: { type: Number, required: true },
    topic: { type: String, required: true },
    objectives: { type: String, required: true },
    resources: { type: String, required: true },
    assessment: { type: String, required: true },
  });
  
  const SchemeSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    class_name: { type: String, required: true },
    term: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    weekTopics: [WeekTopicSchema],
  });
  const innerScheme = mongoose.models.Scheme || mongoose.model<IScheme>('Scheme', SchemeSchema);
