// material
import { Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <Page title="Perfil">
      <Container maxWidth="xl">
        <Typography>Perfil</Typography>
      </Container>
    </Page>
  );
}
