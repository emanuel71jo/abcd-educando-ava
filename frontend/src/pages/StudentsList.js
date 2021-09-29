import React from 'react';
// material
import SchoolIcon from '@material-ui/icons/School';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// components
import Page from '../components/Page';
import StudentListItem from './StudentListItem';

// ----------------------------------------------------------------------

export default function Students() {
  return (
    <Page title="Estudantes">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4" component="h1" color="primary">Estudantes</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
              <List>
                <StudentListItem name="Adélia Meneses Quadros" />
                <StudentListItem name="Alícia Marinho Gadelha" />
                <StudentListItem name="Evaldo Braga Vanderlei Júnior Brito" />
                <StudentListItem name="Orlando Paranhos Tigre" />
                <StudentListItem name="Yangchen Melo Cambezes" />
              </List>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}