import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function AddressList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List subheader={<ListSubheader>Relay Addresses</ListSubheader>} className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-enabled" primary="1234@relay.privately.com" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle('enabled')}
            checked={checked.indexOf('enabled') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-enabled' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
