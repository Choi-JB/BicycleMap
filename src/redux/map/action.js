import {FOCUS_PLACE, CHANGE_MODE, MARK_BICYCLE_ROAD, OPEN_INFO } from './type'

export const focusPlace = (center) => {
    return{
        type: FOCUS_PLACE,
        payload: center     //전달할 parameter
    }
}

export const changeMode = (mode) => {
    return{
        type: CHANGE_MODE,
        payload: mode
    }
}

export const markBicycleRoad = () => {
    return {
        type: MARK_BICYCLE_ROAD
    }
}

export const openInfo = (isOpen) => {
    return {
        type: OPEN_INFO,
        payload: isOpen
    }
}