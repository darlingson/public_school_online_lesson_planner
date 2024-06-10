"use client";

import { useState, useEffect } from 'react';
import Navbar from '../(components)/Navbar';
import Link from 'next/link';

interface WeekTopic {
  week: number;
  topic: string;
  objectives: string;
  resources: string;
  assessment: string;
}

interface Scheme {
  _id: string;
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

export default function Schemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [newScheme, setNewScheme] = useState<Scheme>({
    _id: '',
    title: '',
    email: '',
    subject: '',
    class_name: '',
    term: '',
    description: '',
    startDate: '',
    endDate: '',
    weekTopics: [],
  });

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await fetch('/api/schemes');
      if (response.ok) {
        const data = await response.json();
        console.log(data[0]);
        setSchemes(data);
      } else {
        console.error('Failed to fetch schemes:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch schemes:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewScheme((prevScheme) => ({
      ...prevScheme,
      [name]: value,
    }));
  };

  const handleAddWeekTopic = () => {
    setNewScheme((prevScheme) => ({
      ...prevScheme,
      weekTopics: [
        ...prevScheme.weekTopics,
        { week: prevScheme.weekTopics.length + 1, topic: '', objectives: '', resources: '', assessment: '' },
      ],
    }));
  };

  const handleRemoveWeekTopic = (index: number) => {
    setNewScheme((prevScheme) => ({
      ...prevScheme,
      weekTopics: prevScheme.weekTopics.filter((_, idx) => idx !== index),
    }));
  };

  const handleWeekTopicChange = (index: number, field: string, value: string) => {
    setNewScheme((prevScheme) => {
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
    try {
      const response = await fetch('/api/schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScheme),
      });
      if (response.ok) {
        fetchSchemes();
        setNewScheme({
          _id: '',
          title: '',
          email: '',
          subject: '',
          class_name: '',
          term: '',
          description: '',
          startDate: '',
          endDate: '',
          weekTopics: [],
        });
      } else {
        console.error('Failed to add scheme:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add scheme:', error);
    }
  };

  return (
    <>
    <Navbar pathname = "/schemes"/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Schemes</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold mb-2">Existing Schemes</h2>
          <ul>
            {schemes.map((scheme) => (
              <li key={scheme._id} className="mb-4">
                <h3 className="text-lg font-semibold">{scheme.title}</h3>
                <p>{scheme.description}</p>
                <p>
                  <Link href={`/schemes/${scheme._id}/edit`}>
                  Edit
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Add New Scheme</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-1">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newScheme.title}
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
                value={newScheme.email}
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
                value={newScheme.subject}
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
                value={newScheme.class_name}
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
                value={newScheme.term}
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
                value={newScheme.description}
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
                value={newScheme.startDate}
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
                value={newScheme.endDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Week Topics</h3>
              {newScheme.weekTopics.map((weekTopic, index) => (
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
              Add Scheme
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
