'use client';
import { useState } from 'react';

interface LessonPlan {
    topic: string;
    date: string;
    objectives: string;
    materials: string;
    activities: string;
    timing: string;
  }
export default function NewLessonPlan() {
    const [lessonPlan, setLessonPlan] = useState<LessonPlan>({
        topic: '',
        date: '',
        objectives: '',
        materials: '',
        activities: '',
        timing: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLessonPlan({ ...lessonPlan, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting:', lessonPlan);
        // Here you would typically send the data to your backend via an API call
      };
    
      return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Create New Lesson Plan</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
              <input
                type="text"
                name="topic"
                id="topic"
                value={lessonPlan.topic}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter the topic of the lesson"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={lessonPlan.date}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Objectives</label>
              <textarea
                name="objectives"
                id="objectives"
                value={lessonPlan.objectives}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="What are the objectives of this lesson?"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="materials" className="block text-sm font-medium text-gray-700">Materials</label>
              <textarea
                name="materials"
                id="materials"
                value={lessonPlan.materials}
                onChange={handleChange}
                rows={2}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="List all materials needed"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="activities" className="block text-sm font-medium text-gray-700">Activities</label>
              <textarea
                name="activities"
                id="activities"
                value={lessonPlan.activities}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Describe the activities planned"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="timing" className="block text-sm font-medium text-gray-700">Timing</label>
              <input
                type="text"
                name="timing"
                id="timing"
                value={lessonPlan.timing}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Total duration of the lesson (e.g., 50 minutes)"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
}