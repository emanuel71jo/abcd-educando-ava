// material
import { Box, Container, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
// components
import Page from '../components/Page';
import { api } from '../services/api';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function Students() {
  const classes = useStyles();

  const [values, setValues] = useState();

  useEffect(() => {
    api.get('/students').then((res) => setValues(res.data));
  }, []);

  if (!values) return null;

  return (
    <Page title="Estudantes">
      <Container maxWidth="xl">
        <Box>
          <Typography variant="h4" component="h1" color="primary">
            Estudantes
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Data de cadastro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    {row.firstName} {row.lastName}
                  </TableCell>
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
