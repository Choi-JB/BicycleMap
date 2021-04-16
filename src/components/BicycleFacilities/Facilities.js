import React, { useState } from 'react';
import { connect } from 'react-redux'

import {
    FloatingMenu,
    MainButton,
    ChildButton,
} from 'react-floating-button-menu';
import ToggleButton from '@material-ui/lab/ToggleButton';

import LayersIcon from '@material-ui/icons/Layers';
import CloseIcon from '@material-ui/icons/Close';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import BuildIcon from '@material-ui/icons/Build';

import pump from '../../images/air-pump.png'
import repair_center from '../../images/settings.png'
import rental from '../../images/bike_rent.png'

import { makeStyles } from '@material-ui/core/styles';

import { changeMode, displayAirpump, displayParking, displayRepair, displayRental } from '../../redux/index'

const useStyles = makeStyles((theme) => ({

    position: {
        '& > *': {
            margin: theme.spacing(2),
        },
        position: 'fixed',
        top: '20%',
        right: '0',
        zIndex: '22'
    },
    button: {
        width:'15%',
        height:'15%'
    }

}));

const Facilities = (props) => {
    const classes = useStyles();

    const [isOpen, setOpen] = useState(false);

    const [airpump, setAirPump] = useState(false);
    const [park, setPark] = useState(false);
    const [repair, setRepair] = useState(false);
    const [rent, setRent] = useState(false);

    return (

        <div className={classes.position}>
            <FloatingMenu
                slideSpeed={500}
                irection="down"
                spacing={8}
                isOpen={isOpen}
                className={classes.button}
            >
                <MainButton
                    iconResting={<LayersIcon style={{ fontSize: 40, color: "black" }} />}
                    iconActive={<CloseIcon style={{ fontSize: 40, color: "black" }} />}
                    background="white"
                    onClick={() => setOpen(!isOpen)}
                    size={65}
                />
                <ChildButton
                    icon={<img src={pump} width='30' height='30' />}
                    background="white"
                    size={50}
                    onClick={() => {
                        if(airpump){
                            props.changeMode('default')
                            setAirPump(false)
                        }else{
                            props.changeMode('airpump')
                            setAirPump(true)
                        }
                    }}
                />
                <ChildButton
                    icon={<LocalParkingIcon style={{ fontSize: 30 }} />}
                    background="white"
                    size={50}
                />
                <ChildButton
                    icon={<img src={repair_center} width='30' height='30' />}
                    background="white"
                    size={50}
                    onClick={() => {
                        props.displayRepair()
                    }}
                />
                <ChildButton
                    icon={<img src={rental} width='30' height='30' />}
                    background="white"
                    size={50}
                />
            </ FloatingMenu >
        </ div>
    );
}

//store에서 어떤 state값을 위의 BicycleLayer에 props 값으로 넣어줄지
const mapStateToProps = (state) => {
    return {
        mode: state.map.mode
    }
}
//action을 dispatch하는 함수를 props로
const mapDispatchToProps = {
    changeMode: changeMode,
    displayRepair: displayRepair
}

export default connect(mapStateToProps, mapDispatchToProps)(Facilities)