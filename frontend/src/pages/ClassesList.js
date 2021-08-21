// material
import { Container, Typography } from '@material-ui/core';
import { Header } from '../components/_dashboard/app/components/Header';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function ClassesList() {
  return (
    <Page title="Salas de Aula">
      <Container maxWidth="xl">
        <Header title="Salas de Aula" to="/dashboard/classes/create" buttonTitle="Criar Nova" />
      </Container>
    </Page>
  );
}
