"use client";
import Navbar from "@/app/(components)/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LessonPlan({ params }: { params: { id: string } }) {
  const router = useRouter();
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
        console.error("Failed to fetch lesson plan");
      }
      const data = await response.json();
      console.log(data);
      setLessonPlan(data);
    } catch (error) {
      console.error("Failed to fetch lesson plan:", error);
    }
  };

  return (
    <>
      <Navbar pathname="/lesson-plans" />
      <button
        className="group bg-orange-500 text-white py-2 px-4 rounded flex items-center hover:bg-orange-600 focus:outline-none focus:shadow-outline"
        onClick={() => router.back()}
      >
        <span className="transform transition-transform duration-300 ease-in-out group-hover:-translate-x-2">
          &larr;
        </span>
        <span className="ml-2">Back</span>
      </button>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-orange-500">Lesson Plan</h1>
        {lessonPlan && (
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {lessonPlan.topic}
            </h2>
            <p className="text-gray-600">
              <strong>Class:</strong> {lessonPlan.class_name}
            </p>
            <p className="text-gray-600">
              <strong>Subject:</strong> {lessonPlan.subject}
            </p>
            <p className="text-gray-600">
              <strong>Term:</strong> {lessonPlan.term}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> {lessonPlan.date}
            </p>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Objectives
              </h3>
              <ul className="list-disc list-inside">
                {lessonPlan.objectives.map((objective, index) => (
                  <li key={index} className="text-gray-600">
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Materials</h3>
              <ul className="list-disc list-inside">
                {lessonPlan.materials.map((material, index) => (
                  <li key={index} className="text-gray-600">
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Activities
              </h3>
              <ul className="list-disc list-inside">
                {lessonPlan.activities.map((activity, index) => (
                  <li key={index} className="text-gray-600">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-600">
              <strong>Timing:</strong> {lessonPlan.timing}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {lessonPlan.email}
            </p>
          </div>
        )}
        <div className="mt-4">
          <Link
            href={`/lesson-plans/${id}/edit`}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Edit
          </Link>
        </div>
      </div>
    </>
  );
}
