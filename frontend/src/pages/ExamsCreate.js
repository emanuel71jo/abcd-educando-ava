// material
import { Box, Container, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// components
import PrimarySelect from '../components/MultiSelect/PrimarySelect';
import Page from '../components/Page';
import { Header } from '../components/_dashboard/app/components/Header';
import { api } from '../services/api';

// ----------------------------------------------------------------------

export default function ModulesCreate() {
  const navigate = useNavigate();

  const [values, setValues] = useState(null);

  useEffect(() => {
    api.get('/createRoom').then((res) => {
      setValues(res.data);
    });
  }, []);

  const ExamsSchema = Yup.object().shape({
    description: Yup.string().min(2, 'Muito curto!').max(500, 'Muito longo!'),
    nota: Yup.number()
      .min(0, 'Muito curto!')
      .max(10, 'Muito longo!')
      .required('Nota é um campo obrigatório'),
    module: Yup.string().required(),
    student: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      description: '',
      nota: 0,
      module: '',
      student: ''
    },
    validationSchema: ExamsSchema,
    onSubmit: (valuesFormik) => {
      api
        .post('/activities', valuesFormik)
        .then((res) => {
          alert('Atividade registrada com sucesso!');
          navigate('/dashboard/exam');
        })
        .catch((err) => {
          alert('Houve um erro ao tentar registrar a atividade');
          navigate('/dashboard/exam');
        });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  if (!values) return null;

  return (
    <Page title="Provas">
      <Container maxWidth="xl">
        <Header title="Criar Prova" to="/dashboard/exam" buttonTitle="Voltar" />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box p={2} mt={5}>
              <Stack spacing={2}>
                <PrimarySelect
                  fullWidth
                  label="Módulos"
                  renderCount
                  noWrap
                  {...getFieldProps('module')}
                  optionmessage="Selecione um ou mais Módulos"
                  options={values.modulesUser.map((moduleUser) => ({
                    label: moduleUser.content,
                    value: moduleUser.id
                  }))}
                  variant="outlined"
                  error={Boolean(touched.module && errors.module)}
                  helperText={touched.module && errors.module}
                />
                <Box mb={2} />
                <PrimarySelect
                  fullWidth
                  label="Alunos"
                  renderCount
                  noWrap
                  {...getFieldProps('student')}
                  optionmessage="Selecione um ou mais Alunos"
                  options={values.students.map((student) => ({
                    label: `${student.firstName} ${student.lastName}`,
                    value: student.id
                  }))}
                  variant="outlined"
                  error={Boolean(touched.student && errors.student)}
                  helperText={touched.student && errors.student}
                />
                <Box mb={2} />
                <TextField
                  fullWidth
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  label="Nota da avaliação"
                  {...getFieldProps('nota')}
                  error={Boolean(touched.nota && errors.nota)}
                  helperText={touched.nota && errors.nota}
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
