'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../(components)/Navbar';

// Define an interface for the lesson plan
interface LessonPlan {
    _id: string; // Assuming MongoDB ObjectId as string
    topic: string;
    class_name: string;
    subject: string;
    term: string;
    date: string;
    objectives: string;
    materials: string;
    activities: string;
    timing: string;
    email: string;
}

export default function LessonPlans() {
    const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLessonPlans() {
            try {
                const response = await fetch('/api/lessonplans', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch lesson plans');
                }

                const data = await response.json();
                setLessonPlans(data);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.message);
                setIsLoading(false);
            }
        }

        fetchLessonPlans();
    }, []);

    return (
        <>
        <Navbar pathname="/lesson-plans"/>
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Lesson Plans</h1>
            <div className="mb-4">
                <Link href="/lesson-plans/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create New Lesson Plan
                </Link>
            </div>
            <div className="space-y-2">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : lessonPlans.length > 0 ? (
                    lessonPlans.map(plan => (
                        <Link key={plan._id} href={`/lesson-plans/${plan._id}`} className="block p-4 shadow rounded-lg hover:bg-gray-100">
                            <h2 className="text-lg font-semibold">{plan.topic}</h2>
                            <p>{plan.date}</p>
                            <p className="text-gray-700">{plan.class_name}</p>
                            <p className="text-gray-700">{plan.subject}</p>
                            <p className="text-gray-700">{plan.term}</p>
                            <p className="text-gray-700">{plan.objectives}</p>
                            <p className="text-gray-700">{plan.materials}</p>
                            <p className="text-gray-700">{plan.activities}</p>
                            <p className="text-gray-700">{plan.timing}</p>
                        </Link>
                    ))
                ) : (
                    <p>No lesson plans available. Please create one.</p>
                )}
            </div>
        </div>
        </>
    );
}
