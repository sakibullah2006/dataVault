import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoute.js';
// import vaultRoutes from './routes/userRoute.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());

// default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the DataVault. An API which keeps your secrects' });
});

// routes
app.use('/users', userRoutes);


//connect to the database
connectDB().then(() => {
  // listen for requests
  app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
  });
});

export default app;
