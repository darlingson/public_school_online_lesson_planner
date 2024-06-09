"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const OnboardingPage = () => {
  const [schoolType, setSchoolType] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolCategory, setSchoolCategory] = useState('');
  const [subjects, setSubjects] = useState<{ subjectName: string; className: string }[]>([]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState('');
  const router = useRouter();
  const handleAddSubject = () => {
    if (newSubjectName && newClassName) {
      setSubjects([...subjects, { subjectName: newSubjectName, className: newClassName }]);
      setNewSubjectName('');
      setNewClassName('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      schoolType,
      schoolName,
      schoolCategory,
      subjects,
    });
    try{
      const response = await fetch('/api/teacherProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, userName, userEmail, schoolType, schoolName, schoolCategory, subjects }),
      });
      if (response.ok) {
        setName('');
        setUserName('');
        setUserEmail('');
        setSchoolType('');
        setSchoolName('');
        setSchoolCategory('');
        setSubjects([]);
        console.log('Profile created successfully');
        setMessage('Profile created successfully');
        setTimeout(() => {
          setMessage('');
          router.push('/');
        }, 3000);
      } else {
        setMessage('Failed to create profile : ' + response.statusText);
        console.error('Failed to create profile:', response.statusText);
      }
    }catch(error){

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Onboarding</h2>
        {
          message && <p className="text-red-500 mb-4">{message}</p>
        }
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userUserName">
              User Name
            </label>
            <input
              id="userUserName"
              type="text"
              placeholder="Enter your user name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">
              User Email
            </label>
            <input
              id="userEmail"
              type="email"
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolType">
              School Type
            </label>
            <select
              id="schoolType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={schoolType}
              onChange={(e) => setSchoolType(e.target.value)}
            >
              <option value="">Select School Type</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolName">
              School Name
            </label>
            <input
              id="schoolName"
              type="text"
              placeholder="Enter your school name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolCategory">
              School Category
            </label>
            <select
              id="schoolCategory"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={schoolCategory}
              onChange={(e) => setSchoolCategory(e.target.value)}
            >
              <option value="">Select School Category</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectName">
              Add Subjects
            </label>
            <div className="flex mb-2">
              <input
                id="subjectName"
                type="text"
                placeholder="Subject Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
              />
              <input
                id="className"
                type="text"
                placeholder="Class Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleAddSubject}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Subject
            </button>
          </div>
          {subjects.length > 0 && (
            <div className="mb-4">
              <h3 className="text-gray-700 text-sm font-bold mb-2">Subjects List</h3>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200">Subject Name</th>
                    <th className="py-2 px-4 border-b border-gray-200">Class Name</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-200">{subject.subjectName}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{subject.className}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
