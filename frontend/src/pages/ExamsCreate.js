// material
import { Box, Container, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
// components
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Page from '../components/Page';
import { Header } from '../components/_dashboard/app/components/Header';

// ----------------------------------------------------------------------

export default function ModulesCreate() {
  const navigate = useNavigate();

  const ExamsSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito longo!')
      .required('Título é um campo obrigatório'),
    description: Yup.string()
      .min(2, 'Muito curto!')
      .max(500, 'Muito longo!')
      .required('Descrição é um campo obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: ExamsSchema,
    onSubmit: () => {
      navigate('/dashboard/exam');
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Page title="Provas">
      <Container maxWidth="xl">
        <Header title="Criar Prova" to="/dashboard/exam" buttonTitle="Voltar" />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box p={2} mt={5}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Título"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={1}
                  maxRows={50}
                  rows={10}
                  label="Descrição da avaliação"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
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