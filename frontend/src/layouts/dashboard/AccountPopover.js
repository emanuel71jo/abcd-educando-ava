import personFill from '@iconify/icons-eva/person-fill';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Divider, IconButton, MenuItem, Typography } from '@material-ui/core';
// material
import { alpha } from '@material-ui/core/styles';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
// components
import MenuPopover from '../../components/MenuPopover';
//
const MENU_OPTIONS = [
  {
    label: 'Perfil',
    icon: personFill,
    linkTo: '/dashboard/profile'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { signOut, profile } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src="/static/mock-images/avatars/avatar_default.jpg" alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {(profile && profile.name) || ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {(profile && profile.email) || ''}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={signOut}>
            Sair
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
