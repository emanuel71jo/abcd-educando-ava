// material
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { AppClasses } from '../components/_dashboard/app/AppClasses';
import { AppExams } from '../components/_dashboard/app/AppExams';
import { AppModules } from '../components/_dashboard/app/AppModules';
import { AppStudents } from '../components/_dashboard/app/AppStudents';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Olá, Seja Bem Vindo</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppClasses />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppModules />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppExams />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppStudents />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
