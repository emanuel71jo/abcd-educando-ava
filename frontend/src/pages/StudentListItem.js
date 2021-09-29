import React from 'react';
// material
import SchoolIcon from '@material-ui/icons/School';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

// ----------------------------------------------------------------------

export default function StudentListItem(props) {
  return (
    <ListItem>
      <ListItemAvatar>
      <Avatar style={{ backgroundColor: '#fff' }}>
        <SchoolIcon style={{fontSize: 35}} color="primary" />
      </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.name} />
    </ListItem>
  );
}