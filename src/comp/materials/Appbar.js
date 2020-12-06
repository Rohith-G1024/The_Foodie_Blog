import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
import {PowerSettingsNew, ArrowBack, PersonPin} from '@material-ui/icons';
// import { PinDropSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft:"150px",
    fontFamily: 'Delhi',
    // color:""
  },
  barColor:{ background: 'khaki',color:'slateblue'},
  buttonC : {
    fontSize: '20px',
    fontFamily: 'Delhi',
    marginRight: '20px',
    marginLeft: '20px'
  }
}));

export default function Appbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barColor}>
        <Toolbar>
          
          <IconButton edge="start" className={classes.buttonC} onClick={props.back} color="inherit" aria-label="back">
            <ArrowBack />
             Back
          </IconButton>
          <Typography variant="h1" className={classes.title}>
            FOODIE
          </Typography>
          <IconButton color="inherit" className={classes.buttonC} onClick={props.profile}>
            <PersonPin />
            -Profile
          </IconButton>
          <IconButton color="inherit" className={classes.buttonC} onClick={props.logout}>
            <PowerSettingsNew />
            -Logout
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}