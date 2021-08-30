import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';

import '@fontsource/roboto';


function changeColor() {
    var newColor = this.state.color == 'white' ? 'black' : 'white';
    this.setState({ color: newColor });
}


export default function CustomizedInputBase(args) {
    const classes = useStyles();
    var startSearch = args["startSearch"]
    var searchTerm = args["searchTerm"]
    function onChange(event){
        searchTerm = event.target.value
    }
    return (<div style={{padding: '25px', position: 'relative'}}>
            <Card component="form" className={classes.configBar} elevation={8} variant="outlined" square>
                <div component="form" className={classes.configDiv}>
                    <span/>
                </div>
                <div component="form" className={classes.configDiv} onClick={changeColor}>
                    <ExpandMore className={classes.myTextStyle} color={"disabled"}/>
                    <Typography className={classes.myTextStyle} variant="subtitle2" color={"textSecondary"}>
                        Configure Search Parameters
                    </Typography>
                </div>
            </Card>
            <Card component="form" className={classes.searchBar} elevation={8} variant="outlined" square>
                <IconButton className={classes.iconButton} aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Search Maps"
                    inputProps={{'aria-label': 'search map'}}
                    onChange={onChange}
                />
                <IconButton className={classes.iconButton} aria-label="search"
                            onClick={() => startSearch(searchTerm)}>
                    <SearchIcon/>
                </IconButton>
                <Divider className={classes.divider} orientation="vertical"/>
                <IconButton color="primary" className={classes.iconButton} aria-label="helpoutline"
                            onClick={() => startSearch(searchTerm)}>
                    <HelpIcon/>
                </IconButton>
            </Card>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    searchBar: {
        position: 'absolute',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: '10px'
    },
    configBar: {
        position: 'absolute',
        padding: '2px 4px',
        alignItems: 'center',
        width: 400,
        height: 85,
        borderRadius: '10px'
    },
    configDiv: {
        width: 400,
        height: 42,
        display: 'flex',
        padding: '2px 4px',
        alignItems: 'center',
    },
    innerConfigBar: {
        position: 'relative',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: "8px",
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    myTextStyle: {
        textDecoration: 'none',
        '&:hover': {
            color: 'black',
            cursor: 'pointer'
        }
    }
}));