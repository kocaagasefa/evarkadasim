import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';
import housesReducer from './reducers/houses';

const rootReducer = combineReducers({
    ui:uiReducer,
    auth:authReducer,
    houses:housesReducer
});

let composeEnhancers = compose;

if(__DEV__){
    composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
}

const configureStore= ()=> 
    createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

export default configureStore;