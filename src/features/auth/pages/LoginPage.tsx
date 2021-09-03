import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Redirect } from 'react-router-dom';
import { authActions, selectIsLogging } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },

  box: {
    padding: theme.spacing(3),
  },
}));

function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectIsLogging);
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  const handleLoginClick = () => {
    try {
      dispatch(
        authActions.login({
          username: 'a',
          password: '1',
        })
      );
    } catch (err) {
      console.log('err LoginPage', err);
    }
  };

  //Kiểm tra nếu đã có login ở localStorage thì trả về lại trang admin
  if (isLoggedIn) return <Redirect to="/admin/dashboard" />;

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button onClick={handleLoginClick} fullWidth variant="contained" color="primary">
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default LoginPage;
