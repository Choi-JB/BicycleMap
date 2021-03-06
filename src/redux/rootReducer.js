import { combineReducers } from 'redux'

import mapReducer from './map/reducer'
import facilitiesReducer from './Facilities/reducer'
import mapControlReducer from './MapControl/reducer'
import reportReducer from './Report/reducer'

const rootReducer = combineReducers({
    map: mapReducer,
    facilities: facilitiesReducer,
    mapControl: mapControlReducer,
    report: reportReducer
})

export default rootReducer