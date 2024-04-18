import {combineReducers} from '@reduxjs/toolkit';
import stargazerReducer from './stargazersSlice';

const rootReducer = combineReducers({
  stargazer: stargazerReducer,
});

export default rootReducer;
