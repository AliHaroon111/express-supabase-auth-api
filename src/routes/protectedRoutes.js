import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// GET /protected/profile - guarded by the shared middleware.
router.get('/profile', requireAuth, (req, res) => {
  const { id, email, created_at } = req.user;
  res.status(200).json({ id, email, created_at });
});

// GET /protected/dashboard - a second route reusing the same middleware,
// with no new auth code written (Stage 4 checkpoint).
router.get('/dashboard', requireAuth, (req, res) => {
  res.status(200).json({ message: `Welcome to your dashboard, ${req.user.email}` });
});

export default router;