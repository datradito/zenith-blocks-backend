import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';

const storeConfig = (initialState = {}) =>{
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: initialState
    });
    return store;
};


export default storeConfig;