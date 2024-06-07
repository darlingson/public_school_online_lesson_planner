import mongoose, { Document, Schema } from 'mongoose';

interface IScheme extends Document {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const SchemeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true }
});

export default mongoose.models.Scheme || mongoose.model<IScheme>('Scheme', SchemeSchema);
