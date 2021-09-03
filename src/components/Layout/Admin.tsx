import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import Dashboard from 'features/dashboard/Dashboard';
import StudentFeature from 'features/student/StudentFeature';
import { Route, Switch } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '250px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4),
  },
}));

export const AdminLayout = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>

          <Route path="/admin/students">
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};
