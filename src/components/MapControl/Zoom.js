import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { zoomMap } from '../../redux/index'

const useStyles = makeStyles((theme) => ({

    position: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: 'fixed',
        top: '20%',
        left: '0',
        zIndex: '5',
    },
    button: {
        backgroundColor: 'white',
        width:'20%',
        height:'20%'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
        },
    },

}));

const Zoom = (props) => {

    const classes = useStyles();

    return(
        <div className={classes.position}>
            <ButtonGroup orientation={'vertical'}>
                <Button className={classes.button} 
                    onClick={()=>(props.zoomMap(Number(-1)))}>  {/*확대 */}
                    <AddIcon style={{ color: "gray" }} />
                </Button>
                <Button className={classes.button} 
                    onClick={()=>(props.zoomMap(Number(1)))}>   {/*축소 */}
                    <RemoveIcon style={{ color: "gray" }} />
                </Button>
            </ButtonGroup>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        level: state.mapControl.level
    }
}

const mapDispatchToProps = {
    zoomMap:zoomMap
}

export default connect(mapStateToProps, mapDispatchToProps)(Zoom)