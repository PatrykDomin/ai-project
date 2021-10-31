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
      history.replace(`/${user.id}`);
    }
  }, [user.name, user.id, history]);

  return (
    <div className="flex flex-col justify-center items-center mt-12 h-full min-h-full w-full">
      <Typography>Logowanie / Rejestracja</Typography>
      <form className="flex flex-col w-1/3">
        <TextField
          value={name}
          label="Nazwa"
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <TextField
          value={password}
          type="password"
          label="Hasło"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-row justify-evenly mt-4">
          <Button onClick={() => login(name, password)}>Zaloguj</Button>
          <Button onClick={() => register(name, password)}>Zarejestruj</Button>
        </div>
      </form>
    </div>
  );
};
