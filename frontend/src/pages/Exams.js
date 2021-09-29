// material
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
// components
import Page from '../components/Page';
import { Header } from '../components/_dashboard/app/components/Header';
import { api } from '../services/api';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function Exams() {
  const classes = useStyles();
  const { profile } = useAuth();

  const [values, setValues] = useState(null);

  useEffect(() => {
    api.get('/activities').then((res) => setValues(res.data));
  }, []);

  if (!values) return null;

  return (
    <Page title="Provas">
      <Container maxWidth="xl">
        {profile && Number(profile.type) === 0 && (
          <Header title="Provas" to="/dashboard/exam/create" buttonTitle="Criar" />
        )}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Nota</TableCell>
                <TableCell align="right">Aluno</TableCell>
                <TableCell align="right">Modulo</TableCell>
                <TableCell align="right">Data de criação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.nota}</TableCell>
                  <TableCell align="right">{row.userId}</TableCell>
                  <TableCell align="right">{row.moduleId}</TableCell>
                  <TableCell align="right">{row.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
