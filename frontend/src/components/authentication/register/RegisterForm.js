import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
// material
import {
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { api } from '../../../services/api';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito longo!')
      .required('Nome é um campo obrigatório'),
    lastName: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito longo!')
      .required('Sobrenome é um campo obrigatório'),
    email: Yup.string()
      .email('Email informado é inválido')
      .required('Email é um campo obrigatório'),
    password: Yup.string().required('Password é um campo obrigatório'),
    type: Yup.number().required('O tipo do usuário é um campo obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      type: 0
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      api
        .post('/users', { ...values })
        .then(() => {
          alert('Usuário criado com sucesso!!');
          navigate('/login', { replace: true });
        })
        .catch((err) => {
          alert('Houve um problema ao tentar cadastrar o usuário!!');
          formik.resetForm();
        });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nome"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Sobrenome"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <FormControl variant="outlined">
            <InputLabel id="userTypeLabel">Quero me cadastrar como?</InputLabel>
            <Select
              labelId="userTypeLabel"
              {...getFieldProps('type')}
              label="Quero me cadastrar como?"
              error={Boolean(touched.type && errors.type)}
              helperText={touched.type && errors.type}
            >
              <MenuItem value={0}>Professor</MenuItem>
              <MenuItem value={1}>Aluno</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
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
      </Form>
    </FormikProvider>
  );
}
