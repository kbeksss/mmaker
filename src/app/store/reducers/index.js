import { meModel } from '@app/entities/me/model/index.js'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    me: meModel.reducer,
})
