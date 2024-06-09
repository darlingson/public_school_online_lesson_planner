/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Navbar from "../(components)/Navbar";

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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/teacherProfile/currentUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (err) {
        setError("Error fetching profile");
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
      <Navbar pathname="/profile"/>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-orange-500">
          Teacher Profile
        </h1>
        {profile && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <img
                src="/profile.jpg"
                alt="Profile Picture from Vecteezy.com"
                className="w-48 h-48 rounded-full border-4 border-orange-500"
              />
            </div>
            <div className="text-lg">
              <p className="text-gray-700">
                <strong className="text-orange-500">Name:</strong>{" "}
                {profile.name}
              </p>
              <p className="text-gray-700">
                <strong className="text-orange-500">Username:</strong>{" "}
                {profile.userName}
              </p>
              <p className="text-gray-700">
                <strong className="text-orange-500">Email:</strong>{" "}
                {profile.userEmail}
              </p>
              <p className="text-gray-700">
                <strong className="text-orange-500">School Type:</strong>{" "}
                {profile.schoolType}
              </p>
              <p className="text-gray-700">
                <strong className="text-orange-500">School Name:</strong>{" "}
                {profile.schoolName}
              </p>
              <p className="text-gray-700">
                <strong className="text-orange-500">School Category:</strong>{" "}
                {profile.schoolCategory}
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-2 text-orange-500">
                Subjects
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {profile.subjects.map((subject, index) => (
                  <li key={index} className="text-gray-700">
                    {subject.subjectName} - {subject.className}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>{" "}
    </>
  );
};

export default ProfilePage;
