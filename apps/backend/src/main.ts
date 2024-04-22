import express, { type Express } from 'express';
import cors from 'cors';
import { RocketsRouter } from './routes/rockets';
import { AuthMiddleware } from './authMiddleware';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app: Express = express();

app.use(
  cors({
    origin: '*',
  })
);
app.use(AuthMiddleware);
app.use('/rockets', RocketsRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
