import mongoose, { Document,Schema } from 'mongoose';

interface ITeacherProfile extends Document {
    name: string;
    userName: string;
    userEmail: string;
    schoolType: string;
    schoolName: string;
    schoolCategory: string;
    subjects: Array<{
        subjectName: string;
        className: string;
    }>;
}

const TeacherProfileSchema: Schema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true, unique: true },
    schoolType: { type: String, required: true },
    schoolName: { type: String, required: true },
    schoolCategory: { type: String, required: true },
    subjects: [{
        subjectName: { type: String, required: true },
        className: { type: String, required: true },
    }],
})

export default mongoose.models.Profile || mongoose.model<ITeacherProfile>('Profile', TeacherProfileSchema);
