import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware(logger);

const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware), applyMiddleware(logger)));

sagaMiddleware.run(rootSaga);

export default store;
