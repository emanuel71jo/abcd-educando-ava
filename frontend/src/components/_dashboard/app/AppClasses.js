import monitorFill from '@iconify/icons-eva/monitor-fill';
import { Icon } from '@iconify/react';
import { Card, Typography } from '@material-ui/core';
// material
import { alpha, styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

export function AppClasses({ value }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={monitorFill} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{value}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Salas de Aulas
      </Typography>
    </RootStyle>
  );
}
