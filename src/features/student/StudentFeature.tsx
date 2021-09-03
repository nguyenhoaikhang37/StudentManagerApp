import { Box } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';
import { studentActions } from './studentSlice';

const StudentFeature = () => {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, []);

  return (
    <Box>
      <Switch>
        <Route exact path={match.path}>
          <ListPage />
        </Route>

        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>

        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
};

export default StudentFeature;
