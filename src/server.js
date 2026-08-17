import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import express from 'express';
import { supabase } from './config/supabaseClient.js';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openapiDocument = JSON.parse(readFileSync(path.join(__dirname, 'openapi.json'), 'utf-8'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));


app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'FlyRank Auth API is running.' });
});

app.use('/auth', authRoutes);
app.use('/public', publicRoutes);
app.use('/protected', protectedRoutes);

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
