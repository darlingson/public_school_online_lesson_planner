'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditLessonPlan({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    interface LessonPlan {
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
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLessonPlan((prev) => prev ? { ...prev, [name]: value } : null);
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string) => {
        const { value } = e.target;
        setLessonPlan((prev) => {
            if (prev) {
                const updatedArray = [...(prev as any)[field]];
                updatedArray[index] = value;
                return { ...prev, [field]: updatedArray };
            }
            return prev;
        });
    };

    const addArrayItem = (field: string) => {
        setLessonPlan((prev) => {
            if (prev) {
                const updatedArray = [...(prev as any)[field], ""];
                return { ...prev, [field]: updatedArray };
            }
            return prev;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/lessonplans/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lessonPlan),
            });
            if (!response.ok) {
                console.error('Failed to update lesson plan');
                setError("Failed to update lesson plan" + response.statusText);
            }
            if (response.ok) {
                setMessage("Lesson plan updated successfully");
                setTimeout(() => {
                    router.push('/lesson-plans');    
                }, 1000);
                
            }
        } catch (error) {
            console.error('Failed to update lesson plan:', error);
            setMessage("Failed to update lesson plan" + error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.back()}>Back</button>
            <h1 className="text-2xl font-bold mb-4 text-orange-500">Edit Lesson Plan {params.id}</h1>
            {
                lessonPlan && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-red-500">{error}</p>}
                        {message && <p className="text-green-500">{message}</p>}
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Topic</label>
                            <input name="topic" value={lessonPlan.topic} onChange={handleInputChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Class Name</label>
                            <input name="class_name" value={lessonPlan.class_name} onChange={handleInputChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Subject</label>
                            <input name="subject" value={lessonPlan.subject} onChange={handleInputChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Term</label>
                            <input name="term" value={lessonPlan.term} onChange={handleInputChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Date</label>
                            <input name="date" value={lessonPlan.date} onChange={handleInputChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Objectives</label>
                            {lessonPlan.objectives.map((objective, index) => (
                                <input key={index} value={objective} onChange={(e) => handleArrayChange(e, index, 'objectives')} className="border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            ))}
                            <button type="button" onClick={() => addArrayItem('objectives')} className="bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600 mt-2">Add Objective</button>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Materials</label>
                            {lessonPlan.materials.map((material, index) => (
                                <input key={index} value={material} onChange={(e) => handleArrayChange(e, index, 'materials')} className="border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            ))}
                            <button type="button" onClick={() => addArrayItem('materials')} className="bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600 mt-2">Add Material</button>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Activities</label>
                            {lessonPlan.activities.map((activity, index) => (
                                <input key={index} value={activity} onChange={(e) => handleArrayChange(e, index, 'activities')} className="border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            ))}
                            <button type="button" onClick={() => addArrayItem('activities')} className="bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600 mt-2">Add Activity</button>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Timing</label>
                            <input name="timing" value={lessonPlan.timing} onChange={handleInputChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-gray-700">Email</label>
                            <input name="email" value={lessonPlan.email} onChange={handleInputChange} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">Save</button>
                    </form>
                )
            }
        </div>
    );
}
