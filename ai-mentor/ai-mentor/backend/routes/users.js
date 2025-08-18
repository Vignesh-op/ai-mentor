import express from 'express';
import User from '../models/User.js';
import LearningPath from '../models/LearningPath.js';
import client from '../utils/openaiClient.js';

const router = express.Router();

// Create or fetch user
router.post('/', async (req, res) => {
  const { email, name } = req.body;
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name });
  res.json(user);
});

// Generate learning path using AI (simple structured JSON schema)
router.post('/:id/generate-path', async (req, res) => {
  try {
    const { targetRole = 'Software Developer', skills = [] } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const system = { role: 'system', content: 'You generate concise learning paths as JSON: {steps:[{title,description,resources:[]}]}' };
    const prompt = { role: 'user', content: `User skills: ${skills.join(', ') || 'N/A'}; Target role: ${targetRole}. 5 steps.` };
    const resp = await client.chat.completions.create({ model: 'gpt-4o-mini', messages: [system, prompt] });
    const jsonStart = (resp.choices?.[0]?.message?.content || '{}').trim();
    let data;
    try { data = JSON.parse(jsonStart); } catch { data = { steps: [{ title: 'Explore basics', description: jsonStart, resources: [] }] }; }

    const lp = await LearningPath.create({ user: user._id, targetRole, steps: data.steps || [], progress: 0 });
    user.learningPath = lp._id; await user.save();
    res.json(lp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Path generation failed', details: err.message });
  }
});

export default router;
