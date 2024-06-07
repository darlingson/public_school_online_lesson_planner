'use client';

import { useEffect, useState } from 'react';

interface Scheme {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function Schemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    const response = await fetch('/api/schemes');
    const data = await response.json();
    setSchemes(data);
  };

  const handleAddScheme = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newScheme = {
      title,
      description,
      startDate,
      endDate
    };

    const response = await fetch('/api/schemes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newScheme),
    });

    if (response.ok) {
      fetchSchemes();
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } else {
      console.error('Failed to add scheme');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        {/* List of schemes */}
        <div className="w-2/3 pr-4">
          <h1 className="text-xl font-bold mb-4">Schemes</h1>
          {schemes.length > 0 ? (
            schemes.map((scheme) => (
              <div key={scheme.id} className="p-4 shadow rounded-lg mb-4">
                <h2 className="text-lg font-semibold">{scheme.title}</h2>
                <p>{scheme.description}</p>
                <p>
                  {scheme.startDate} to {scheme.endDate}
                </p>
              </div>
            ))
          ) : (
            <p>No schemes available. Please add one.</p>
          )}
        </div>

        {/* Form to add new scheme */}
        <div className="w-1/3 pl-4">
          <h2 className="text-lg font-bold mb-4">Add New Scheme</h2>
          <form onSubmit={handleAddScheme} className="space-y-4">
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block font-medium mb-1">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block font-medium mb-1">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Scheme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
