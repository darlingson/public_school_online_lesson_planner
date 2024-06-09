"use client";

import { useEffect, useState } from "react";

// Define interfaces for the data types
interface Scheme {
  _id: string;
  title: string;
  description: string;
}

interface LessonPlan {
  _id: string;
  topic: string;
  date: string;
}

export default function Home() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    fetchSchemes();
    fetchLessonPlans();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await fetch("/api/dashboard/schemes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch schemes");
      }
      const data = await response.json();
      setSchemes(data);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setErrors((prevErrors) => [...prevErrors, "Failed to fetch schemes"]);
    }
  };

  const fetchLessonPlans = async () => {
    try {
      const response = await fetch("/api/dashboard/lessonplans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch lesson plans");
      }
      const data = await response.json();
      setLessonPlans(data);
    } catch (error) {
      console.error("Error fetching lesson plans:", error);
      setErrors((prevErrors) => [...prevErrors, "Failed to fetch lesson plans"]);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-500">Dashboard</h1>

      {errors.length > 0 && (
        <div className="text-center text-red-500 mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="flex-1 space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-orange-500">Schemes</h2>
          {schemes.length > 0 ? (
            schemes.map((scheme) => (
              <div key={scheme._id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{scheme.title}</h3>
                <p className="text-gray-700 mb-4">{scheme.description}</p>
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No schemes available</p>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4 text-orange-500">Lesson Plans</h2>
          {lessonPlans.length > 0 ? (
            lessonPlans.map((lessonPlan) => (
              <div key={lessonPlan._id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{lessonPlan.topic}</h3>
                <p className="text-gray-700 mb-4">{lessonPlan.date}</p>
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No lesson plans available</p>
          )}
        </div>
      </div>
    </div>
  );
}
