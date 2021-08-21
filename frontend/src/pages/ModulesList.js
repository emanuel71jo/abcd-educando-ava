// material
import { Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { Header } from '../components/_dashboard/app/components/Header';

// ----------------------------------------------------------------------

export default function ModulesList() {
  return (
    <Page title="Módulos">
      <Container maxWidth="xl">
        <Header title="Módulos" to="/dashboard/modules/create" buttonTitle="Criar Novo" />
      </Container>
    </Page>
  );
}
