import { Box, Card, Container, Link, Typography } from '@material-ui/core';
// material
import { styled } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
// components
import Page from '../components/Page';
// layouts
import AuthLayout from '../layouts/AuthLayout';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Cadastro">
      <AuthLayout>
        Já possui uma conta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Entrar
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Ambiente Virtual de Aprendizagem
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Cadastrar
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Informe a baixo seus dados para cadastro
            </Typography>
          </Box>
          <RegisterForm />
          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Já possui uma conta?&nbsp;
              <Link to="/login" component={RouterLink}>
                Entrar
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
