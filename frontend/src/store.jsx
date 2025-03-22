import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer, userReducer, onGoodsReducer } from './reducers';
// import { appReducer, userReducer, usersReducer, postReducer, postsReducer } from './reducers';

const reducer = combineReducers({
    user: userReducer,
    app: appReducer,
    onGoods: onGoodsReducer,
   
    // post: postReducer,
    // posts: postsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));