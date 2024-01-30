import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './userSlice';

const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
