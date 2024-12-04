import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sifa Backend is running!');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
