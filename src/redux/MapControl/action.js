import { FIND_PLACE, ZOOM_MAP, REDUCE_MAP, UPDATE_LEVEL } from './type'

export const findPlace = (coords) => {
    return{
        type: FIND_PLACE,
        payload: coords 
    }
}

export const zoomMap = (level) => {
    return{
        type: ZOOM_MAP,
        payload: level
    }
}

export const updateLevel = (level) => {
    return{
        type: UPDATE_LEVEL,
        payload: Number(level)
    }
}
