
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from "./reducers";

const reducer = combineReducers(reducers);

export default createStore(reducer, applyMiddleware(thunk));