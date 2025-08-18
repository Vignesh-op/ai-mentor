import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, default: 'student' },
  skills: [String],
  resumeUrl: String,
  learningPath: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath' }
}, { timestamps: true });
export default mongoose.model('User', UserSchema);
