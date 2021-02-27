import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import sessionStorage from 'redux-persist/es/storage/session';
import thunkMiddleware from 'redux-thunk';
import person from '../ducks/person';


const rootPersistConfig = {
    key: 'root',
    storage:  sessionStorage,
    stateReconciler: hardSet
};

const loggerMiddleware = createLogger({
    predicate: (getState, action) => __DEV__
});

const rootReducer = combineReducers({
    person
});

const store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
    compose(applyMiddleware(loggerMiddleware, thunkMiddleware))
);
const persistor = persistStore(store);

export default { store, persistor };