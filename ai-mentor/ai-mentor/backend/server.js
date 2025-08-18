import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_mentor';
mongoose.connect(uri).then(()=> console.log('MongoDB connected')).catch(err=>console.error(err));

app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
