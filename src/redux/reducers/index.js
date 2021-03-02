import { combineReducers } from 'redux';
import { user } from './users.reducers';
import { reducer } from './reducer'

export const reducers = combineReducers({ user });