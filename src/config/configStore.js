import rootReducer from './rootReducer';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

export const configure = (initialState) => {
    const persistConfig = {
        key: 'root',
        storage,
    };
      
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
        persistedReducer,
        initialState,
        applyMiddleware(thunkMiddleware));
    return { store };
};