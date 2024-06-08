import mongoose, { Document, Schema } from 'mongoose';

interface IScheme extends Document {
  title: string;
  email: string;
  subject: string;
  class_name: string;
  term: string;
  description: string;
  startDate: string;
  endDate: string;
  weekTopics: Array<{
    week: number;
    topic: string;
    objectives: string;
    resources: string;
    assessment: string;
  }>;
}

const WeekTopicSchema: Schema = new Schema({
  week: { type: Number, required: true },
  topic: { type: String, required: true },
  objectives: { type: String, required: true },
  resources: { type: String, required: true },
  assessment: { type: String, required: true },
});

const SchemeSchema: Schema = new Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  class_name: { type: String, required: true },
  term: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  weekTopics: [WeekTopicSchema],
});

export default mongoose.models.Scheme || mongoose.model<IScheme>('Scheme', SchemeSchema);
