import {call, put} from 'redux-saga/effects';
import {
  fetchStargazersSuccess,
  fetchStargazersFailure,
} from '../slices/stargazersSlice';
import {fetchStargazers as fetchStargazersApi} from '../../api';

export function* fetchStargazersSaga(action: any) {
  try {
    const stargazers = yield call(
      fetchStargazersApi,
      action.payload.owner,
      action.payload.repo,
      action.payload.page,
    );
    yield put(fetchStargazersSuccess(stargazers));
  } catch (e) {
    yield put(fetchStargazersFailure(e.message));
  }
}
