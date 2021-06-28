import express from 'express';
import jwt from 'jsonwebtoken';
import { routes } from './routes/routes';
import { getUser } from './services/services';

const app = express();

app.listen(4200, () => console.log('server start on 4200'));

// app routes CRUD
app.use(routes);
