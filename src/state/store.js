import { createStore, applyMiddleware, compose } from 'redux'
import AllReducers from './reducers'
import thunk from 'redux-thunk';


const store = createStore(
	AllReducers,
	compose(applyMiddleware(thunk))
);
export default store;