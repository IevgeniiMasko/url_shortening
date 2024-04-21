import express, { Express } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import { errorHandler } from './middleware/errorHandler';
import { shortUrlRoute } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(json());

app.use(shortUrlRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
