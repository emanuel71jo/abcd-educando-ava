// material
import { Box, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export function Header({ title, to, buttonTitle }) {
  const navigate = useNavigate();

  return (
    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h4" component="h1" color="primary">
        {title}
      </Typography>
      <Button
        onClick={() => {
          navigate(to);
        }}
        variant="outlined"
      >
        {buttonTitle}
      </Button>
    </Box>
  );
}
