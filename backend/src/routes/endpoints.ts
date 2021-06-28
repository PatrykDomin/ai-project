import { Router } from 'express';
import { auth } from './authorization';

const routes = Router();

routes.get('/user', auth, async (req, res) => {
  return res.status(200).send(req.body.user);
});

export { routes };
