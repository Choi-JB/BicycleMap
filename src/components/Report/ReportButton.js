import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'

import AddLocationIcon from '@material-ui/icons/AddLocation';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from '@material-ui/core/styles';

import { setReportMode } from '../../redux/index'

const useStyles = makeStyles((theme) => ({

    position: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: 'fixed',
        top: '35%',
        left: '0',
        zIndex: '44',
    },
    button: {
        backgroundColor: 'white',
        width:'20%',
        height:'20%'
    }

}));

const CurrentPosition = (props) => {
    const classes = useStyles();

    const [view, setView] = useState('list');
    const handleChange = (event, nextView) => {
        setView(nextView);
    };
    const report = () => {
        props.setReportMode()
    }

    return (
        <div className={classes.position}>
            <ButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
                <Button value="gps" aria-label="gps" className={classes.button}
                    onClick={report}
                >
                    <AddLocationIcon style={{ color: "gray" }} />
                </Button>
            </ButtonGroup>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = {
    setReportMode: setReportMode

}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPosition)