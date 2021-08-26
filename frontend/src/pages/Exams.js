// material
import { Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { Header } from '../components/_dashboard/app/components/Header';

//---------------------------------------------------------------------

export default function Exams() {
  return (
    <Page title="Provas">
      <Container maxWidth="xl">
       <Header title="Provas" to="/dashboard/exam/create" buttonTitle="Criar" />  
      </Container>
    </Page>
  );
}
