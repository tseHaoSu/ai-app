import dotenv from 'dotenv';
import express from 'express';
import router from './route';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
