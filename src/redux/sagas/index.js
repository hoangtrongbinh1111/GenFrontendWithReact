import { all } from 'redux-saga/effects';
import usersSaga from './users';
import booksSaga from './books';
export default function* rootSaga() {
 yield all([
usersSaga(),
booksSaga(),
])}