import { FOCUS_PLACE, CHANGE_MODE, MARK_BICYCLE_ROAD, OPEN_INFO } from './type'

const initialState = {
    center: {},     //지도 중심 좌표
    positions:[],       //지도에 찍을 마커 좌표들
    bicycle:false,      //자전거도로 on / off
    mode:'default',      //default , airpump, park, repair, rent : 지도에 표시할 레이어
    info:false
}

const mapReducer = (state=initialState, action) => {
    switch(action.type){
        case FOCUS_PLACE:
            return{
                ...state,
                center: action.payload
            }
        case CHANGE_MODE:
            return{
                ...state,
                mode: action.payload,
                positions:state.positions
            }
        case MARK_BICYCLE_ROAD:
            return{
                ...state,
                bicycle: !state.bicycle
            }
        case OPEN_INFO:
            return{
                ...state,
                info: action.payload
            }
        default: 
            return state;
    }
}

export default mapReducer