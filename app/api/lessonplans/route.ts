// import { NextRequest, NextResponse } from 'next/server';
// import dbconnect from '../../(lib)/mongodb';
// import LessonPlan from '../../(models)/LessonPlan';

// export async function GET() {
//     await dbconnect();

//     try {
//         const lessonPlans = await LessonPlan.find({});
//         return NextResponse.json(lessonPlans);
//     } catch (error) {
//         return NextResponse.json({ message: 'Error fetching lesson plans', error }, { status: 500 });
//     }
// }

// export async function POST(request: NextRequest) {
//     await dbconnect();

//     try {
//         const { topic, class_name, subject, term, date, objectives, materials, activities, timing, email } = await request.json();
//         const lessonPlan = new LessonPlan({
//             topic,
//             class_name,
//             subject,
//             term,
//             date,
//             objectives,
//             materials,
//             activities,
//             timing,
//             email
//         });
//         await lessonPlan.save();
//         return NextResponse.json({ message: 'Lesson Plan created successfully' }, { status: 201 });
//     } catch (error) {
//         console.error('Error creating Lesson Plan:', error);
//         return NextResponse.json({ message: 'Error creating Lesson Plan', error }, { status: 400 });
//     }
// }


import { NextRequest, NextResponse } from 'next/server';
import dbconnect from '../../(lib)/mongodb';
import LessonPlan from '../../(models)/LessonPlan';

export async function GET(req: NextRequest) {
    await dbconnect();
    const userEmail = req.headers.get('user-email');
    if (!userEmail) {
        return NextResponse.json({ message: 'Email not provided' }, { status: 400 });
    }

    try {
        const lessonPlans = await LessonPlan.find({ email: userEmail });
        console.log(`The email of the user is : ${userEmail}`)
        console.log(`the lesson plans are : ${lessonPlans}`)
        return NextResponse.json(lessonPlans);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching lesson plans', error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    console.log("route hit!")
    console.log(request.headers.get('user-email'));
    await dbconnect();
    
    const userEmail = request.headers.get('user-email');
    if (!userEmail) {
        return NextResponse.json({ message: 'Email not provided' }, { status: 400 });
    }

    try {
        const { topic, class_name, subject, term, date, objectives, materials, activities, timing } = await request.json();
        const lessonPlan = new LessonPlan({
            topic,
            class_name,
            subject,
            term,
            date,
            objectives,
            materials,
            activities,
            timing,
            email: userEmail
        });
        await lessonPlan.save();
        return NextResponse.json({ message: 'Lesson Plan created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating Lesson Plan:', error);
        return NextResponse.json({ message: 'Error creating Lesson Plan', error }, { status: 400 });
    }
}
