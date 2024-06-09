'use client';

import { useEffect, useState } from 'react';
import Navbar from '../(components)/Navbar';


interface Subject {
  subjectName: string;
  className: string;
}

interface TeacherProfile {
  name: string;
  userName: string;
  userEmail: string;
  schoolType: string;
  schoolName: string;
  schoolCategory: string;
  subjects: Subject[];
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/teacherProfile/currentUser',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (err) {
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Profile</h1>
      {profile && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Username:</strong> {profile.userName}</p>
          <p><strong>Email:</strong> {profile.userEmail}</p>
          <p><strong>School Type:</strong> {profile.schoolType}</p>
          <p><strong>School Name:</strong> {profile.schoolName}</p>
          <p><strong>School Category:</strong> {profile.schoolCategory}</p>
          <div>
            <h2 className="text-xl font-semibold mt-4">Subjects</h2>
            <ul className="list-disc pl-5">
              {profile.subjects.map((subject, index) => (
                <li key={index}>
                  {subject.subjectName} - {subject.className}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ProfilePage;
