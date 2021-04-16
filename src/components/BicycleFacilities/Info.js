import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

import { displayOldReport, displayInfo } from '../../redux/index'

//css
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 180,
        position: 'fixed',
        left: '0%',
        bottom: '0%',
        zIndex: '3',
    },
    container: {
        /* display: 'flex', */
    },
    paper: {
        margin: theme.spacing(1),
    },
    title: {
        fontSize: 22,
        color: 'blue'
    },
    other: {
        fontSize: 15
    }

}));

const Info = (props) => {
    const classes = useStyles();

    //store에서 가져온 state값
    const { info, selectedMarker } = props;

    //길찾기 연결
    const findRoad = function () {
        var link = `https://map.kakao.com/link/to/${selectedMarker.위치},${selectedMarker.위도},${selectedMarker.경도}`
        window.open(link)
    }
    //신고창 열기
    const openReport = function () {
        props.displayOldReport(true)
    }
    //인포창 렌더링
    const showInfo = function () {
        switch (selectedMarker.type) {
            case 'airpump': return( //선택한 마커가 공기주입기
                <>

                </>
            )

            case 'repair': return (     //선택한 마커가 수리센터 
                <>
                    <div className={classes.title}>자전거 수리센터 </div>
                    <div className={classes.other}>
                        {selectedMarker.위치}<br />
                        운영기간: {selectedMarker.운영기간} / {selectedMarker.운영시간}<br />
                        운영일: {selectedMarker.운영일} / 휴무일: {selectedMarker.휴무일}<br />
                        문의: {selectedMarker.문의처} / {selectedMarker.전화번호1}
                    </div>
                </>
            )

            default:
                return (
                    <>
                        <div className={classes.title}>불러오는 중... </div>
                        
                    </>
                )
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Fade in={info}>
                    <Paper elevation={3} className={classes.paper}>
                        
                        {showInfo()}

                        <button onClick={findRoad}>길찾기</button>
                        <button onClick={openReport}>신고하기</button>
                    </Paper>

                </Fade>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        info: state.facilities.info,
        selectedMarker: state.facilities.selectedMarker
    }
}

const mapDispatchToProps = {
    displayOldReport: displayOldReport,
    displayInfo: displayInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)