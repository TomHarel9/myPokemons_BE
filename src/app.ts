import { isHttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import PokeRouter from './routes';

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api', PokeRouter);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log('~ app.get ~ err:', error);
  let errorMessage = 'Unknown Error';
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
