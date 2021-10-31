import { Button, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Router } from './routes/Router';
import { useStore } from './store/store';

function App() {
  const { user, logout } = useStore((state) => state);

  const history = useHistory();

  useEffect(() => {
    if (!user.name) {
      history.replace('/register');
    }
  }, [user.name, history]);

  return (
    <div className="flex flex-col h-full w-full min-w-full min-h-full">
      <div
        className="flex flex-row h-24 justify-between items-center w-full p-4"
        style={{ backgroundColor: 'turquoise' }}
      >
        <Typography variant="h5">
          Zwierzakoofka {user.name ? `- ${user.name}` : ''}
        </Typography>
        {user.name && (
          <div className="flex flex-row">
            <Button style={{ marginRight: 12 }}>
              <Link to={`/${user.id}`}>Moje zwierzaki</Link>
            </Button>
            <Button style={{ marginRight: 24 }}>
              <Link to={`/${user.id}/search`}>Wyszukaj</Link>
            </Button>
            <Button variant="text" onClick={logout}>
              Wyloguj
            </Button>
          </div>
        )}
      </div>
      <div className="flex h-full w-full min-w-full min-h-full">
        <Router />
      </div>
    </div>
  );
}

export default App;
