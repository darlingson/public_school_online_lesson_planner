"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../../(components)/Navbar';

interface WeekTopic {
  week: number;
  topic: string;
  objectives: string;
  resources: string;
  assessment: string;
}

interface Scheme {
  id: string;
  title: string;
  email: string;
  subject: string;
  class_name: string;
  term: string;
  description: string;
  startDate: string;
  endDate: string;
  weekTopics: WeekTopic[];
}

export default function EditScheme() {
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const schemeId = searchParams.get('id');

  useEffect(() => {
    if (schemeId) {
      fetchScheme(schemeId);
    }
  }, [schemeId]);

  const fetchScheme = async (id: string) => {
    try {
      const response = await fetch(`/api/schemes/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch scheme");
      }
      const data = await response.json();
      setScheme(data);
    } catch (error) {
      console.error('Failed to fetch scheme:', error);
      setError("Failed to fetch scheme");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setScheme((prevScheme) => prevScheme ? {
      ...prevScheme,
      [name]: value,
    } : null);
  };

  const handleAddWeekTopic = () => {
    setScheme((prevScheme) => prevScheme ? ({
      ...prevScheme,
      weekTopics: [
        ...prevScheme.weekTopics,
        { week: prevScheme.weekTopics.length + 1, topic: '', objectives: '', resources: '', assessment: '' },
      ],
    }) : null);
  };

  const handleRemoveWeekTopic = (index: number) => {
    setScheme((prevScheme) => prevScheme ? ({
      ...prevScheme,
      weekTopics: prevScheme.weekTopics.filter((_, idx) => idx !== index),
    }) : null);
  };

  const handleWeekTopicChange = (index: number, field: string, value: string) => {
    setScheme((prevScheme) => {
      if (!prevScheme) return null;
      const newWeekTopics = [...prevScheme.weekTopics];
      newWeekTopics[index] = {
        ...newWeekTopics[index],
        [field]: value,
      };
      return {
        ...prevScheme,
        weekTopics: newWeekTopics,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!scheme) return;
    try {
      const response = await fetch(`/api/schemes/${scheme.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheme),
      });
      if (!response.ok) {
        throw new Error('Failed to update scheme');
      }
      router.push('/schemes');  // Navigate back to the schemes page after editing
    } catch (error) {
      console.error('Failed to update scheme:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar pathname="/editScheme" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Scheme</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={scheme?.title || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={scheme?.email || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block font-medium mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={scheme?.subject || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="class_name" className="block font-medium mb-1">Class Name</label>
            <input
              type="text"
              id="class_name"
              name="class_name"
              value={scheme?.class_name || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="term" className="block font-medium mb-1">Term</label>
            <input
              type="text"
              id="term"
              name="term"
              value={scheme?.term || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={scheme?.description || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={scheme?.startDate || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block font-medium mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={scheme?.endDate || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Week Topics</h3>
            {scheme?.weekTopics.map((weekTopic, index) => (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1">Week {weekTopic.week}</label>
                <input
                  type="text"
                  placeholder={`Week ${weekTopic.week} Topic`}
                  value={weekTopic.topic}
                  onChange={(e) => handleWeekTopicChange(index, 'topic', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Objectives"
                  value={weekTopic.objectives}
                  onChange={(e) => handleWeekTopicChange(index, 'objectives', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Resources"
                  value={weekTopic.resources}
                  onChange={(e) => handleWeekTopicChange(index, 'resources', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Assessment"
                  value={weekTopic.assessment}
                  onChange={(e) => handleWeekTopicChange(index, 'assessment', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveWeekTopic(index)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddWeekTopic}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Week Topic
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Update Scheme
          </button>
        </form>
      </div>
    </>
  );
}
