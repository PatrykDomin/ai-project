import { Button, Typography, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../store/store';

export const Register: React.FC = () => {
  const { user, login, register } = useStore((state) => state);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (user.name) {
      history.push('/');
    }
  }, [user.name, history]);

  return user.token ? (
    <div>
      <Typography>Jesteś już zalogowany</Typography>
    </div>
  ) : (
    <div>
      <Typography>Logowanie / Rejestracja</Typography>
      <form>
        <TextField value={name} label="Nazwa" onChange={(e) => setName(e.target.value)} />
        <TextField
          value={password}
          type="password"
          label="Hasło"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button onClick={() => login(name, password)}>Zaloguj</Button>
          <Button onClick={() => register(name, password)}>Zarejestruj</Button>
        </div>
      </form>
    </div>
  );
};
