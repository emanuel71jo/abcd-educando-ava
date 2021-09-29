// material
import { Box, Container, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
// components
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Page from '../components/Page';
import { api } from '../services/api';
import { Header } from '../components/_dashboard/app/components/Header';

// ----------------------------------------------------------------------

export default function ModulesCreate() {
  const navigate = useNavigate();

  const ModulesSchema = Yup.object().shape({
    content: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito longo!')
      .required('Título é um campo obrigatório'),
    evaluation: Yup.string()
      .min(2, 'Muito curto!')
      .max(500, 'Muito longo!')
      .required('Descrição é um campo obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      evaluation: ''
    },
    validationSchema: ModulesSchema,
    onSubmit: (values) => {
      api
        .post('/module', values)
        .then(() => {
          alert('Modulo criado com sucesso!!');
          navigate('/dashboard/modules');
        })
        .catch(() => {
          alert('Houve um erro ao tentar criar um modulo, por favor tente novamente mais tarde.');
          navigate('/dashboard/modules');
        });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Page title="Módulos">
      <Container maxWidth="xl">
        <Header title="Criar Módulo" to="/dashboard/modules" buttonTitle="Voltar" />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box p={2} mt={5}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Título do módulo"
                  {...getFieldProps('content')}
                  error={Boolean(touched.content && errors.content)}
                  helperText={touched.content && errors.content}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  label="Descrição do conteúdo programático"
                  {...getFieldProps('evaluation')}
                  error={Boolean(touched.evaluation && errors.evaluation)}
                  helperText={touched.evaluation && errors.evaluation}
                />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Cadastrar
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
