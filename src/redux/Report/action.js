import { DISPLAY_OLD_REPORT, DISPLAY_NEW_REPORT, DISPLAY_REPORT_DETAIL, REPORT_MODE, SET_LATLNG } from './type'

export const displayOldReport = (isOpen) => {
    return{
        type: DISPLAY_OLD_REPORT,
        payload: isOpen
    }
}

export const displayNewReport = (isOpen) => {
    return{
        type: DISPLAY_NEW_REPORT,
        payload: isOpen
    }
}

export const displayReportDetail = (isOpen) => {
    return{
        type: DISPLAY_REPORT_DETAIL,
        payload: isOpen
    }
}

export const setReportMode = () => {
    return{
        type: REPORT_MODE,
    }
}

export const setLatlng = (latlng) => {
    return{
        type: SET_LATLNG,
        payload: latlng
    }
}