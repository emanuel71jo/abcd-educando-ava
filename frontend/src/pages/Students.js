// material
import { Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Students() {
  return (
    <Page title="Estudantes">
      <Container maxWidth="xl">
        <Typography>Estudantes</Typography>
      </Container>
    </Page>
  );
}
