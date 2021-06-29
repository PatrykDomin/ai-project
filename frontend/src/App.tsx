import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { Router } from './routes/Router';
import { useStore } from './store/store';

function App() {
  const { user } = useStore((state) => state);

  const history = useHistory();

  useEffect(() => {
    if (!user.name) {
      history.push('/register');
    }
  }, [user.name, history]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full" style={{ height: 100 }}>
        Użytkownik: {user.name}
      </div>
      <div className="flex h-full w-full">
        <Router />
      </div>
    </div>
  );
}

export default App;
