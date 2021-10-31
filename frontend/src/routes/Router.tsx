import { Switch, Route } from 'react-router-dom';
import { Home } from '../features/Home';
import { Register } from '../features/Register';
import { Search } from '../features/Search';
import { SinglePet } from '../features/SinglePet';

export const Router = () => {
  return (
    <Switch>
      <Route path="/register" exact>
        <Register />
      </Route>

      <Route path="/:userId" exact>
        <Home />
      </Route>
      <Route path="/:userId/search" exact>
        <Search />
      </Route>
      <Route path="/:userId/pets/:petId" exact>
        <SinglePet />
      </Route>
    </Switch>
  );
};
