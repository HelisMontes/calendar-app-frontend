import { combineReducers } from 'redux'
import { uiReducers } from './uiReducers'

export const rootReducers = combineReducers({
    ui: uiReducers,
})