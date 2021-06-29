import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { authRouter } from './routes/authorization';
import { routes } from './routes/endpoints';

const app = express();

// cors
app.use(cors());

// body-parser
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

// routes
app.use(routes);
app.use(authRouter);

app.listen(4200, () => console.log('server start on 4200'));
