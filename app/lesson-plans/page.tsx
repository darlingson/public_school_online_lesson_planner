'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define an interface for the lesson plan
interface LessonPlan {
    id: number;
    date: string;
    topic: string;
    objectives: string;
    materials: string;
    activities: string;
    timing: string;
}

export default function LessonPlans() {
    const demoLessonPlans: LessonPlan[] = [
        {
            id: 1,
            date: '2024-06-05',
            topic: 'Introduction to Poetry',
            objectives: 'Identify different types of poems and understand basic elements of poetry.',
            materials: 'Textbook on Poetry, Whiteboard and markers',
            activities: 'Lecture, Group Discussion, Individual Assignment',
            timing: '50 minutes'
        },
        {
            id: 2,
            date: '2024-06-06',
            topic: 'Analyzing Poems',
            objectives: 'Analyze the themes and language used in selected poems.',
            materials: 'Copies of selected poems, Worksheets for analysis',
            activities: 'Warm-up, Individual Reading, Worksheet Activity',
            timing: '50 minutes'
        }
    ];

    const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);

    useEffect(() => {
        // Instead of fetching from an API, we use demo data
        setLessonPlans(demoLessonPlans);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Lesson Plans</h1>
            <div className="mb-4">
                <Link href="/lesson-plans/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create New Lesson Plan
                </Link>
            </div>
            <div className="space-y-2">
                {lessonPlans.length > 0 ? (
                    lessonPlans.map(plan => (
                        <div key={plan.id} className="p-4 shadow rounded-lg">
                            <h2 className="text-lg font-semibold">{plan.topic}</h2>
                            <p>{plan.date}</p>
                            <p className="text-gray-700">{plan.objectives}</p>
                            <Link href={`/lesson-plans/${plan.id}`} className='text-blue-500 hover:text-blue-800"'>
                                View/Edit
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No lesson plans available. Please create one.</p>
                )}
            </div>
        </div>
    );
}
