import express from 'express';
import client from '../utils/openaiClient.js';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: '/tmp' });

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const resp = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: messages || [{ role: 'user', content: 'Hello!' }],
      max_tokens: 600
    });
    const answer = resp?.choices?.[0]?.message?.content || 'No response';
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI error', details: err.message });
  }
});

router.post('/speech-to-text', upload.single('audio'), async (req, res) => {
  try {
    const path = req.file?.path;
    if (!path) return res.status(400).json({ error: 'No audio file' });
    const stream = fs.createReadStream(path);
    const tr = await client.audio.transcriptions.create({ file: stream, model: 'whisper-1' });
    fs.unlinkSync(path);
    res.json({ text: tr.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Transcription failed', details: err.message });
  }
});

router.post('/image', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await client.images.generate({ model: 'dall-e-3', prompt: prompt || 'educational diagram', size: '1024x1024' });
    const image = result?.data?.[0]?.b64_json || null;
    res.json({ image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image generation failed', details: err.message });
  }
});

export default router;
