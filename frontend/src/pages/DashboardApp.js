// material
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
// components
import Page from '../components/Page';
import { AppClasses } from '../components/_dashboard/app/AppClasses';
import { AppExams } from '../components/_dashboard/app/AppExams';
import { AppModules } from '../components/_dashboard/app/AppModules';
import { AppStudents } from '../components/_dashboard/app/AppStudents';
import { useAuth } from '../hooks/useAuth';

export default function DashboardApp() {
  const [values, setValues] = useState(null);
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) return;

    if (Number(profile.type) === 0)
      api.get('/overview').then((response) => setValues(response.data));
    else api.get('/overview/student').then((response) => setValues(response.data));
  }, []);

  if (!values) return null;

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Olá, Seja Bem Vindo</Typography>
        </Box>
        {profile && Number(profile.type) === 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppClasses value={values.totalRoomsUser} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppModules value={values.totalModulesUser} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppExams value={values.totalActivitiesUser} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppStudents value={values.totalStudents} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppClasses value={values.totalRoomsUser} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppExams value={values.totalActivitiesUser} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
