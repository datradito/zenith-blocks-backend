import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


//read about storage https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeConfig = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});


export const persistor = persistStore(storeConfig);