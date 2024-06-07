import { NextRequest, NextResponse } from 'next/server';
import dbconnect from '../../(lib)/mongodb';
import LessonPlan from '../../(models)/LessonPlan';

export async function GET() {
    await dbconnect();

    try {
        const lessonPlans = await LessonPlan.find({});
        return NextResponse.json(lessonPlans);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching lesson plans', error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    await dbconnect();

    try {
        const { topic, date, objectives, materials, activities, timing, email } = await request.json();
        const lessonPlan = new LessonPlan({ topic, date, objectives, materials, activities, timing, email });
        await lessonPlan.save();
        return NextResponse.json({ message: 'Lesson Plan created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating Lesson Plan', error }, { status: 400 });
    }
}
