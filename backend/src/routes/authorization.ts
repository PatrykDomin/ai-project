import { NextFunction, Request, Router, Response } from 'express';
import { addUser, getUser } from '../services/services';
import { genSalt, hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { name, password } = req.body ?? {};

  if (name && password) {
    const salt = await genSalt(5);
    const hashPass = await hash(password, salt);

    const userExists = await getUser(name);
    if (userExists) {
      return res.status(400).send('Użytkownik już istnieje');
    } else {
      addUser(name, hashPass);
      res.status(200).send('Zarejestrowano');
    }
  } else {
    res.status(400).send('Podaj nazwę oraz hasło');
  }
});

authRouter.post('/login', async (req, res) => {
  const { name, password } = req.body ?? {};

  if (name && password) {
    const user = await getUser(name);

    if (!user) {
      return res.status(400).send('Nie znaleziono użytkownika');
    }

    const validPass = await compare(password, user.password);

    if (validPass || !user) {
      const token = jwt.sign(
        { id: user.id, isAdmin: user.role === 'ADMIN' },
        process.env.SECRET_TOKEN as jwt.Secret,
        { expiresIn: '1h' }
      );

      res
        .header('auth-token', token)
        .send({ id: user.id, name: user.name, role: user.role, token });
    } else {
      res.status(400).send('Błędne hasło');
    }
  } else {
    res.status(400).send('Podaj nazwę oraz hasło');
  }
});

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send('Brak dostępu');

  jwt.verify(token, process.env.SECRET_TOKEN as jwt.Secret, (err, user) => {
    if (err) return res.status(400).send('Zły token');

    req.body.user = user;
    next();
  });
};

authRouter.post('/logout', auth, (req, res) => {
  res.status(200).send('Wylogowano');
});

export { authRouter, auth };
