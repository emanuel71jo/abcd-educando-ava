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

export default function ClassesList() {
  const classes = useStyles();
  const { profile } = useAuth();

  const [values, setValues] = useState(null);

  useEffect(() => {
    if (!profile) return;

    if (Number(profile.type) === 0) api.get('/rooms').then((response) => setValues(response.data));
    else api.get('/rooms/student').then((response) => setValues(response.data));
  });

  if (!values) return null;

  return (
    <Page title="Disciplinas">
      <Container maxWidth="xl">
        {profile && Number(profile.type) === 0 && (
          <Header title="Disciplinas" to="/dashboard/classes/create" buttonTitle="Criar Nova" />
        )}
        <TableContainer component={Paper}>
          {profile && Number(profile.type) === 0 ? (
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Nome</TableCell>
                  <TableCell align="right">Quantidade de modulos</TableCell>
                  <TableCell align="right">Quantidade de alunos</TableCell>
                  <TableCell align="right">Data de Criação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.countModules}</TableCell>
                    <TableCell align="right">{row.countStudents}</TableCell>
                    <TableCell align="right">{row.created_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Id da Disciplina</TableCell>
                  <TableCell align="right">Data de Criação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.roomId}</TableCell>
                    <TableCell align="right">{row.created_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </Page>
  );
}
