import { Grid } from '@mui/material';
import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from '../utils/Loader';

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state == 'loading';
  return (
    <>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Grid item xs={12} sm={8} md={4}>
          {isLoading && <Loader />}
          { !isLoading && <Outlet /> }
        </Grid>
      </Grid>
    </>
  );
};

export default AppLayout;
