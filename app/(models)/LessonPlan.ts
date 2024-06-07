import mongoose, { Document, Schema } from 'mongoose';

interface ILessonPlan extends Document {
  topic: string;
  date: string;
  objectives: string[];
  materials: string[];
  activities: string[];
  timing: string;
  email: string;
}

const LessonPlanSchema: Schema = new Schema({
  topic: { type: String, required: true },
  date: { type: String, required: true },
  objectives: { type: [String], required: true },
  materials: { type: [String], required: true },
  activities: { type: [String], required: true },
  timing: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.models.LessonPlan || mongoose.model<ILessonPlan>('LessonPlan', LessonPlanSchema);
