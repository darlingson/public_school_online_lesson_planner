'use client'
import Head from "next/head";
import Navbar from "../(components)/Navbar";

export default function Profile() {
    return <>
    <Navbar/>
    <div className="container mx-auto p-4 pt-6 md:p-6 md:pt-12">
      <Head>
        <title>Teacher Profile - John Doe</title>
      </Head>

      <h1 className="text-3xl font-bold mb-4">Teacher Profile</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">John Doe</h2>
          <p className="text-lg">Mathematics Teacher</p>
          <p className="text-lg">Lilongwe Secondary School</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:mt-4">
          <div className="text-lg">
            <span className="font-bold">Email:</span> <a href="mailto:johndoe@school.edu" className="hover:underline">johndoe@school.edu</a>
          </div>
          <div className="text-lg">
            <span className="font-bold">Phone:</span> +265 999 123 456
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-4">About Me</h2>
        <p className="text-lg">Hi, I &apos; m John Doe, a passionate mathematics teacher with 5 years of experience. I love inspiring young minds and making mathematics fun and accessible to all.</p>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-4">Teaching Subjects</h2>
        <ul className="list-none m-0 p-0">
          <li className="text-lg">Mathematics (Grades 8-12)</li>
          <li className="text-lg">Science (Grades 8-10)</li>
        </ul>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-4">Lesson Plans</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <a href="#" className="text-lg hover:underline">View Lesson Plans</a>
          </div>
          <div>
            <a href="#" className="text-lg hover:underline">Create New Lesson Plan</a>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-4">Schemes of Work</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <a href="#" className="text-lg hover:underline">View Schemes of Work</a>
          </div>
          <div>
            <a href="#" className="text-lg hover:underline">Create New Scheme of Work</a>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-4">Teaching Philosophy</h2>
        <p className="text-lg">I believe every student has the potential to excel in mathematics. My approach is student-centered, and I strive to create a supportive and inclusive learning environment.</p>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-4">Professional Development</h2>
        <ul className="list-none m-0 p-0">
          <li className="text-lg">Attended the Teaching Mathematics with Technology workshop (2022)</li>
          <li className="text-lg">Completed the Differentiated Instruction online course (2023)</li>
        </ul>
      </div>
    </div>
    </>
}