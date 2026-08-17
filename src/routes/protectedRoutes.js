import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// GET /protected/profile - requires a valid bearer token, verified against Supabase.
router.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Ask Supabase whether this token is real. This makes a network call,
  // so the answer is trustworthy (not just a local decode).
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const { id, email, created_at } = data.user;
  res.status(200).json({ id, email, created_at });
});

export default router;