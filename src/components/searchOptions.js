import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import HelpIcon from "@material-ui/icons/Help";
import React from "react";


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        backgroundColor: theme.palette.background.default,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 415,
        height: '100vh',
    },
    searchBar: {
        position: 'relative',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: '10px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchOptionMenu() {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <Card component="form" className={classes.searchBar} elevation={8} variant="outlined"  square>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Search Maps"
                inputProps={{ 'aria-label': 'search maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="helpoutline">
                <HelpIcon />
            </IconButton>
        </Card>
    </div>
    )
}