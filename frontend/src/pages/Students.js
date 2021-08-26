// material
import { Box, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Students() {
  return (
    <Page title="Estudantes">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4" component="h1" color="primary">Estudantes</Typography>
        </Box>
      </Container>
    </Page>
  );
}