import { combineReducers } from 'redux'
import { calendarReducers } from './calendarReducers'
import { uiReducers } from './uiReducers'

export const rootReducers = combineReducers({
    ui: uiReducers,
    calendar: calendarReducers,
})