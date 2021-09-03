import cityApi from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { useEffect } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { history } from 'utils(nhung ham share chung)/history';

function App() {
  useEffect(() => {}, []);

  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/admin/dashboard" />
        <Redirect exact from="/admin" to="/admin/dashboard" />

        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
