import { combineReducers } from 'redux';
import { user } from './users.reducers';
import { reducer } from './items.reducer';

export const reducers = combineReducers({ user, items: reducer });
