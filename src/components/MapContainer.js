import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import gpsImage from '../images/gps.png'
import repairImage from '../images/repair 50x50.png'
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { displayInfo, updateLevel, selectMarker, setLatlng, displayNewReport } from '../redux/index'
import { makeStyles } from '@material-ui/core/styles';

import airpumpData from '../data/airpump.json'  //공기주입기 정보 json배열
import repairData from '../data/repair.json'    //수리센터 정보 json배열

//BACKEND 접속 용
import {ip} from '../redux/ip'
import axios from 'axios'
import { Autocomplete } from '@material-ui/lab';

const { kakao } = window;

const useStyles = makeStyles((theme) => ({

    mouseCursor: {
        
    },
    none:{

    }

}));

function MapContainer(props) {
    const classes = useStyles();

    const [kakaoMap, setKakaoMap] = useState(null);

    //store의 state값들
    const { bicycle, airpump, park, repair, rental , mode, info, place, level, reportMode } = props;

    const container = useRef();
    
    // const [searchMarker, setPlace] = useState(
    //     new kakao.maps.Marker({
    //         map: kakaoMap, // 마커를 표시할 지도
    //         position: new_center,
    //         title: '중심',
    //         image: markerImage // 마커 이미지 
    //     })
    // );

    const [repairMarkers, setRepair] = useState([]);    //수리센터 마커

    var [events, setEvent] = useState([]);  //신고버튼 이벤트

    //초기 기본지도 생성
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=8c913351b41f937d64c4ce21a2b8b058&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                const center = new kakao.maps.LatLng(35.876379446167306, 128.59602700717645);
                const options = {
                    center,
                    level: 5
                };
                const map = new kakao.maps.Map(container.current, options);
                setKakaoMap(map);

                kakao.maps.event.addListener(map, 'zoom_changed', function() {             
                    props.updateLevel(map.getLevel()) //지도 축적이 변할때마다 store의 level값 갱신
                });
            });

        };
        container.current.style.height = '90vh' //지도 사이즈

        // axios.get(ip + '/data' , {params: { message:'post11' }} )
        //     .then(res => {
        //         console.log(res.data.test)
        //        setData(res.data.test)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         alert(err)
        //     })

        //=================== 수리센터 마커 생성===================
        var markerImage = new kakao.maps.MarkerImage(
            repairImage,  new kakao.maps.Size(35, 35)
        )
        var markers = [];

        repairData.forEach(function(index){
            var latlng = new kakao.maps.LatLng(index.위도, index.경도)

            var marker = new kakao.maps.Marker({
                position: latlng, // 마커를 표시할 위치
                title : index.위치, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                zIndex: index.번호, //json배열내 index, 번호값 저장
                image: markerImage
            });
            markers.push(marker)
        })
        setRepair(markers)  //수리센터 마커객체를 생성하고 markers라는 state값에 저장
        
    }, [container])


    useEffect(()=>{
        if (kakaoMap === null) {
            return;
        }
        // axios.get(ip + '/data' , {params: { message:'post11' }} )
        //     .then(res => {
                
        //        alert(res.data.message)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         alert(err)
        //     })
    },[])

    //검색 후 해당 위치로 지도 이동
    useEffect(() => {
        if (kakaoMap === null) {
            return;
        }

        const new_center = new kakao.maps.LatLng(place.lat, place.lng);
        kakaoMap.setCenter(new_center);
        kakaoMap.setLevel(4);

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: kakaoMap, // 마커를 표시할 지도
            position: new_center,
            title: '중심',
            image: markerImage // 마커 이미지 
        });
    }, [place]);

    //지도 확대/축소
    useEffect(()=>{
        if (kakaoMap === null) {
            return;
        }
        kakaoMap.setLevel(level) 
    },[level])

    //자전거 도로 on/off
    useEffect(() => {
        if (kakaoMap === null) {
            return;
        }
        var mapTypes = {
            bicycle: kakao.maps.MapTypeId.BICYCLE,
            useDistrict: kakao.maps.MapTypeId.USE_DISTRICT
        };

        if (props.bicycle) {  //자전거도로 on
            kakaoMap.addOverlayMapTypeId(mapTypes.bicycle);
        } else {  //off
            kakaoMap.removeOverlayMapTypeId(mapTypes.bicycle);
        }
        
    }, [bicycle]);

    //신규시설 신고~~
    var reportHandler = function(mouseEvent){
        var data = mouseEvent.latLng;
        var latlng = {위도:data.getLat(), 경도: data.getLng()}
        
        props.setLatlng(latlng)
        props.displayNewReport(true);
    }
    useEffect(() => {
        if (kakaoMap === null) {
            return;
        }
        //addListener 후에 removeListener시 target, type, 함수가 완전히 동일해야함
        if(reportMode){
            kakao.maps.event.addListener(kakaoMap, 'click', reportHandler)
            setEvent([{ target: kakaoMap, type: 'click', handler: reportHandler }]);
        }else{
            events.forEach(function(e){ //이렇게 배열에 event를 저장해서 완전 대조 식으로 하지 않으면 event삭제가 안됨
                kakao.maps.event.removeListener(e.target, e.type, e.handler)
            })
        }
        
    }, [reportMode]);


    //시설 마커 표시
    const openInfo = function(event) {
        props.displayInfo(true)
        
    }
    const closeInfo = function(event) {
        props.displayInfo(false)
    }


    // useEffect(() => {
    //     if (kakaoMap === null) {
    //         return;
    //     }

    //     var markerImage = new kakao.maps.MarkerImage(
    //         gpsImage, new kakao.maps.Size(43, 43)
    //     )
    //     testMarker.setImage(markerImage)

    //     switch (mode) {
    //         case 'default':
    //             airpumpMarker.setMap(null)
    //             testMarker.setMap(null)
    //             renterMarker.setMap(null)
    //             kakao.maps.event.removeListener(airpumpMarker, 'click', openInfo)
    //             kakao.maps.event.removeListener(renterMarker, 'click', openInfo)
    //             //kakao.maps.event.removeListener(kakaoMap, 'click', closeInfo)
    //             break;
    //         case 'airpump':
    //             airpumpMarker.setMap(kakaoMap)
    //             testMarker.setMap(kakaoMap)
    //             renterMarker.setMap(kakaoMap)
    //             kakao.maps.event.addListener(airpumpMarker, 'click', openInfo)
    //             kakao.maps.event.addListener(renterMarker,'click',openInfo)
    //             kakao.maps.event.addListener(kakaoMap, 'click', closeInfo)
                
    //             break;

    //         case 'repair':
                
    //             break;
    //     }
    // }, [mode]);

    //수리센터 마커 표시
    useEffect(()=>{
        if (kakaoMap === null) {
            return;
        }
        if(repair){ //수리센터 표시
            repairMarkers.forEach(function(marker){
                marker.setMap(kakaoMap);
                kakao.maps.event.addListener(marker, 'click', function(){
                    var index = marker.getZIndex()  //zindex에 저장한 번호 값
                    var select
                    repairData.forEach(function(data){ //json배열내 시설정보 찾기
                        if(index===data.번호){      
                            select = data
                        }
                    })
                    select.type = 'repair'
                    props.selectMarker(select)      //선택한 마커 
                    console.log(marker.getZIndex())
                    openInfo()
                })
            })
            kakao.maps.event.addListener(kakaoMap, 'click', closeInfo)
        }else{  //수리센터 마커 지우기
            repairMarkers.forEach(function(marker){
                marker.setMap(null);
            })
        }

    },[repair])

    //className={reportMode? classes.mouseCursor:classes.none}
    return (
        <div class="map_container" ref={container} />
    )
}

const mapStateToProps = (state) => {
    return {

        mode: state.map.mode,

        airpump: state.facilities.airpump,
        parking: state.facilities.parking,
        repair: state.facilities.repair,
        rental: state.facilities.repair,
        
        bicycle: state.facilities.bicycle,
        info: state.facilities.info,

        place: state.mapControl.place,
        level: state.mapControl.level,

        reportMode: state.report.reportMode
    }
}

const mapDispatchToProps = {
    displayInfo: displayInfo,
    updateLevel: updateLevel,
    selectMarker: selectMarker,
    displayNewReport: displayNewReport,
    setLatlng: setLatlng
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
