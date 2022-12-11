import { combineReducers,  } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { configureStore } from '@reduxjs/toolkit'
const reducer = combineReducers(reducers);


export const store = configureStore({ reducer: reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) })



