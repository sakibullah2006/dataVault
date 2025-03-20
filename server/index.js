import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoute.js';
import vaultRoutes from './routes/vaultRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());
app.use(cors({
  origin: "http://127.0.0.1:5500", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  credentials: true, // Allow cookies and credentials
}));

// default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the DataVault. An API which keeps your secrects' });
});

// routes
app.use('/users', userRoutes);
app.use('/vaults', vaultRoutes);


//connect to the database
connectDB().then(() => {
  // listen for requests
  app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
  });
});

export default app;
