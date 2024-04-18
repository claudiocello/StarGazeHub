import {all, takeLatest} from 'redux-saga/effects';
import {fetchStargazersSaga} from './fetchStargazersSaga';
import {fetchStargazersRequest} from '../slices/stargazersSlice';

export function* rootSaga() {
  yield all([takeLatest(fetchStargazersRequest.type, fetchStargazersSaga)]);
}
