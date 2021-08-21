// material
import { Box, Container, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
// components
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PrimarySelect from '../components/MultiSelect/PrimarySelect';
import Page from '../components/Page';
import { Header } from '../components/_dashboard/app/components/Header';

// ----------------------------------------------------------------------

export default function ClassesCreate() {
  const navigate = useNavigate();

  const ClassesSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito longo!')
      .required('Título é um campo obrigatório'),
    students: Yup.array()
      .of(Yup.string())
      .min(1, 'Você deve selecionar pelo menos um aluno para criar uma sala de aula')
      .required(),
    modules: Yup.array()
      .of(Yup.string())
      .min(1, 'Você deve selecionar pelo menos um módulo para criar uma sala de aula')
      .required()
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      students: [],
      modules: []
    },
    validationSchema: ClassesSchema,
    onSubmit: () => {
      navigate('/dashboard/classes');
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Page title="Salas de Aula">
      <Container maxWidth="xl">
        <Header title="Criar Sala" to="/dashboard/classes" buttonTitle="Voltar" />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box p={2} mt={5}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Nome da disciplina"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <PrimarySelect
                  fullWidth
                  label="Alunos"
                  multiple
                  renderCount
                  noWrap
                  {...getFieldProps('students')}
                  optionmessage="Selecione um ou mais Alunos"
                  options={[
                    {
                      value: 'asasdasdasdasd',
                      label: `João Emauel`
                    },
                    {
                      value: 'asasdasdasasdasddasd',
                      label: `João Emauel`
                    },
                    {
                      value: 'asasdasdasdASasasd',
                      label: `João Emauel`
                    }
                  ]}
                  variant="outlined"
                  error={Boolean(touched.students && errors.students)}
                  helperText={touched.students && errors.students}
                />
                <Box mt={2} />
                <PrimarySelect
                  fullWidth
                  label="Módulos"
                  multiple
                  renderCount
                  noWrap
                  {...getFieldProps('modules')}
                  optionmessage="Selecione um ou mais Módulos"
                  options={[
                    {
                      value: 'asasdasdasdasd',
                      label: `João Emauel`
                    },
                    {
                      value: 'asasdasdasasdasddasd',
                      label: `João Emauel`
                    },
                    {
                      value: 'asasdasdasdASasasd',
                      label: `João Emauel`
                    }
                  ]}
                  variant="outlined"
                  error={Boolean(touched.modules && errors.modules)}
                  helperText={touched.modules && errors.modules}
                />
                <Box mt={2} />
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
