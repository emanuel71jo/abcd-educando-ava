import { useState, useEffect } from 'react';
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
// components
import Page from '../components/Page';
import { Header } from '../components/_dashboard/app/components/Header';
import { api } from '../services/api';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function ModulesList() {
  const classes = useStyles();

  const [values, setValues] = useState(null);

  useEffect(() => {
    api.get('/module').then((res) => setValues(res.data));
  });

  if (!values) return null;

  return (
    <Page title="Módulos">
      <Container maxWidth="xl">
        <Header title="Módulos" to="/dashboard/modules/create" buttonTitle="Criar Novo" />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Título</TableCell>
                <TableCell align="right">Conteúdo</TableCell>
                <TableCell align="right">Data de criação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.content}</TableCell>
                  <TableCell align="right">{row.evaluation}</TableCell>
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
