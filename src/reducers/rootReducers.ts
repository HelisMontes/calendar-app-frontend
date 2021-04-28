import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { calendarReducers } from './calendarReducers'
import { uiReducers } from './uiReducers'

export const rootReducers = combineReducers({
    ui: uiReducers,
    calendar: calendarReducers,
    auth: authReducer
})