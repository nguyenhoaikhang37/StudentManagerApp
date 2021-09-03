import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: theme.spacing(1, 3),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const StatisticItem = ({ icon, label, value }: StatisticItemProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>

      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
};

export default StatisticItem;
