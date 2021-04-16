import { FIND_PLACE, ZOOM_MAP, UPDATE_LEVEL } from './type'

const initialState = {
    place: {},     //지도 중심 좌표
    level: 5        //지도 확대/축소 level
}

const mapControlReducer = (state=initialState, action) => {
    switch(action.type){
        case FIND_PLACE:
            return{
                ...state,
                place: action.payload
            }
        case ZOOM_MAP:
            return{
                ...state,
                level: state.level + action.payload
            }
        case UPDATE_LEVEL:
            return{
                ...state,
                level: action.payload
            }
        default: 
            return state;
    }
}

export default mapControlReducer
