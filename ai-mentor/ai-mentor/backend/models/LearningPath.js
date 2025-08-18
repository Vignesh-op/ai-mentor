import mongoose from 'mongoose';
const StepSchema = new mongoose.Schema({ title: String, description: String, resources: [String] });
const LearningPathSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetRole: String,
  steps: [StepSchema],
  progress: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('LearningPath', LearningPathSchema);
