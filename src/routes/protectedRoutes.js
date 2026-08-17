import { Router } from 'express';

const router = Router();

// GET /protected/profile - requires a bearer token in the Authorization header.
// Stage 2: we only check that a token was PRESENTED - we don't verify it yet.
router.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Stage 3 will replace this placeholder with real Supabase verification.
  res.status(200).json({ message: 'Token was presented (not yet verified).' });
});

export default router;
