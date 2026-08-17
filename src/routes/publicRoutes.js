import { Router } from 'express';

const router = Router();

// GET /public/info - open to anyone, no auth required.
router.get('/info', (req, res) => {
  res.status(200).json({ message: 'Welcome stranger! This info is public.' });
});

export default router;
