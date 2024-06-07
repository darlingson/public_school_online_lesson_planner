import { NextRequest, NextResponse } from 'next/server';
import dbconnect from '../../../(lib)/mongodb';
import LessonPlan from '../../../(models)/LessonPlan';

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  await dbconnect();

  const { id } = params;

  try {
    const lessonPlan = await LessonPlan.findById(id);
    if (!lessonPlan) {
      return NextResponse.json({ message: 'Lesson Plan not found' }, { status: 404 });
    }
    return NextResponse.json(lessonPlan);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching lesson plan', error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  await dbconnect();

  const { id } = params;
  const body = await request.json();

  try {
    const lessonPlan = await LessonPlan.findByIdAndUpdate(id, body, { new: true });
    if (!lessonPlan) {
      return NextResponse.json({ message: 'Lesson Plan not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Lesson Plan updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating lesson plan', error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  await dbconnect();

  const { id } = params;

  try {
    const lessonPlan = await LessonPlan.findByIdAndDelete(id);
    if (!lessonPlan) {
      return NextResponse.json({ message: 'Lesson Plan not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Lesson Plan deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting lesson plan', error }, { status: 400 });
  }
}
