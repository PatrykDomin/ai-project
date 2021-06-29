import { Switch, Route } from 'react-router-dom';
import { Register } from '../features/Register';

export const Router = () => {
  return (
    <Switch>
      <Route path="/register" exact>
        <Register />
      </Route>

      <Route path="/" exact>
        <div>home</div>
      </Route>
      <Route path="/:userId/pets" exact>
        <div>pets</div>
      </Route>
      <Route path="/:userId/pets/:petId" exact>
        <div>petposts</div>
      </Route>
    </Switch>
  );
};
