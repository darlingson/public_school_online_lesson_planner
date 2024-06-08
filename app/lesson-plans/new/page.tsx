'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface LessonPlanFormData {
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

interface LessonPlanFormProps {}

export default function LessonPlanForm(props: LessonPlanFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LessonPlanFormData>({
    topic: '',
    class_name: '',
    subject: '',
    term: '',
    date: '',
    objectives: [''],
    materials: [''],
    activities: [''],
    timing: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number | null, field: keyof LessonPlanFormData) => {
    const newFormData = { ...formData };
    if (field === 'objectives' || field === 'materials' || field === 'activities') {
      if (index !== null) {
        (newFormData[field] as string[])[index] = e.target.value;
      }
    } else {
      if (field in newFormData) {
        newFormData[field] = e.target.value;
      }
    }
    setFormData(newFormData);
  };

  const handleAddInput = (field: keyof LessonPlanFormData) => {
    const newFormData = { ...formData };
    if (field === 'objectives' || field === 'materials' || field === 'activities') {
    newFormData[field].push(''); 
    }
    setFormData(newFormData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData.email);
    e.preventDefault();
    try {
      const response = await fetch('/api/lessonplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Lesson Plan created successfully');
        router.push('/lesson-plans');
        setFormData({
          topic: '',
          class_name: '',
          subject: '',
          term: '',
          date: '',
          objectives: [''],
          materials: [''],
          activities: [''],
          timing: '',
          email: '',
        });
      } else {
        // console.error(response.statusText);
        console.log(response.json());
        // Handle error
      }
    } catch (error) {
      console.error('Error creating Lesson Plan:', error);
      // Handle error
    }
  };

  return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-md">
  <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
  <input type="text" id="topic" name="topic" value={formData.topic} onChange={(e) => handleChange(e, null, 'topic')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" /><br /><br />
  
  <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class:</label>
  <input type="text" id='class' name="class_name" value={formData.class_name} onChange={(e) => handleChange(e, null, 'class_name')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" /><br /><br />

  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
  <input type='text' id='subject' name="subject" value={formData.subject} onChange={(e) => handleChange(e, null, 'subject')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" /><br /><br />

  <label htmlFor="term" className="block text-sm font-medium text-gray-700">Term:</label>
  <input type="text" id="term" name="term" value={formData.term} onChange={(e) => handleChange(e, null, 'term')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" /><br /><br />

  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
  <input type="text" id="date" name="date" value={formData.date} onChange={(e) => handleChange(e, null, 'date')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" /><br /><br />
  
  <label className="block text-sm font-medium text-gray-700">Objectives:</label>
  {formData.objectives.map((objective, index) => (
    <div key={index} className="flex mb-2">
      <input type="text" value={objective} onChange={(e) => handleChange(e, index, 'objectives')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" />
    </div>
  ))}
  <button type="button" onClick={() => handleAddInput('objectives')} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add Objective</button><br /><br />
  
  <label className="block text-sm font-medium text-gray-700">Materials:</label>
  {formData.materials.map((material, index) => (
    <div key={index} className="flex mb-2">
      <input type="text" value={material} onChange={(e) => handleChange(e, index, 'materials')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" />
    </div>
  ))}
  <button type="button" onClick={() => handleAddInput('materials')} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add Material</button><br /><br />
  
  <label className="block text-sm font-medium text-gray-700">Activities:</label>
  {formData.activities.map((activity, index) => (
    <div key={index} className="flex mb-2">
      <input type="text" value={activity} onChange={(e) => handleChange(e, index, 'activities')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" />
    </div>
  ))}
  <button type="button" onClick={() => handleAddInput('activities')} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add Activity</button><br /><br />
  
  <label htmlFor="timing" className="block text-sm font-medium text-gray-700">Timing:</label>
  <input type="text" id="timing" name="timing" value={formData.timing} onChange={(e) => handleChange(e, null, 'timing')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" /><br /><br />
  
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
  <input type="email" id="email" name="email" value={formData.email} onChange={(e) => handleChange(e, null, 'email')} className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded" /><br /><br />
  
  <input type="submit" value="Submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" />
</form>
  );
}
