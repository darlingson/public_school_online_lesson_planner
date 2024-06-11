'use client';
import Navbar from "@/app/(components)/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonPlan({ params }: { params: { id: string } }) {
    interface LessonPlan{
        topic: string;
        class_name: string;
        subject: string;
        term: string;
        date: string;
        objectives: string[];
        materials: string[];
        activities: string[];
        timing: string;
        email: string;
      }
    const id = params.id;
    useEffect(() => {
        fetchLessonPlan();
    }, []);
    const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
    const fetchLessonPlan = async () => {
        try {
            const response = await fetch(`/api/lessonplans/${id}`);
            if (!response.ok) {
                console.error('Failed to fetch lesson plan');
            }
            const data = await response.json();
            console.log(data);
            setLessonPlan(data);
        } catch (error) {
            console.error('Failed to fetch lesson plan:', error);
        }
    }
    // return <div>Edit lesson plan {params.id}</div>;
    return (
        <>
        <Navbar pathname="/lesson-plans"/>
            <h1>Lesson Plan</h1>
            {
                lessonPlan && (
                    <div>
                        <h1>{lessonPlan.topic}</h1>
                        <p>{lessonPlan.class_name}</p>
                        <p>{lessonPlan.subject}</p>
                        <p>{lessonPlan.term}</p>
                        <p>{lessonPlan.date}</p>
                        <p>{lessonPlan.objectives.map((objective, index) => <li key={index}>{objective}</li>)}</p>
                        <p>{lessonPlan.materials.map((material, index) => <li key={index}>{material}</li>)}</p>
                        <p>{lessonPlan.activities.map((activity, index) => <li key={index}>{activity}</li>)}</p>
                        <p>{lessonPlan.timing}</p>
                        <p>{lessonPlan.email}</p>
                    </div>
                )
            }
            <Link href={`/lesson-plans/${id}/edit`}>Edit</Link>
        </>
    );
}