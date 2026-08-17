import 'dotenv/config';
import express from 'express';
import { supabase } from './config/supabaseClient.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Stage 0 checkpoint: server boots and the Supabase client is initialized
// without throwing. Routes are added in later stages.
app.get('/', (req, res) => {
  res.json({ message: 'FlyRank Auth API is running.' });
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Light sanity check that the Supabase client was created correctly.
  // getSession() just reads local state - it does not require a logged-in user.
  const { error } = await supabase.auth.getSession();
  if (error) {
    console.error('Supabase client error:', error.message);
  } else {
    console.log('Connected to Supabase.');
  }
});
