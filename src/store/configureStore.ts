import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './slices';
import {rootSaga} from './sagas';
import reactotron from '../../ReactotronConfig';

const sagaMiddleware = createSagaMiddleware();

const isDevelopment = process.env.NODE_ENV !== 'production';
const isTest = process.env.NODE_ENV === 'test';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: isDevelopment,
  enhancers: getDefaultEnhancers => {
    const enhancers = getDefaultEnhancers();
    if (!isTest && isDevelopment && reactotron?.createEnhancer) {
      return [...enhancers, reactotron.createEnhancer()];
    }
    return enhancers;
  },
});

// Run your rootSaga
sagaMiddleware.run(rootSaga);

// Type for the RootState
export type AppState = ReturnType<typeof store.getState>;

export default store;
