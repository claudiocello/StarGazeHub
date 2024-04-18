import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Stargazer} from '../../models/Stargazer';

interface StargazersState {
  stargazers: Stargazer[];
  loading: boolean;
  error: string | null;
  success: boolean;
  loadingMore: boolean;
}

const initialState: StargazersState = {
  stargazers: [],
  loading: false,
  error: null,
  success: false,
  loadingMore: false,
};

const stargazersSlice = createSlice({
  name: 'stargazers',
  initialState,
  reducers: {
    fetchStargazersRequest(
      state,
      action: PayloadAction<{owner: string; repo: string; page?: number}>,
    ) {
      state.loading = true;
      state.loadingMore = true;
      state.error = null;
      state.success = false;
    },
    fetchStargazersSuccess(state, action: PayloadAction<Stargazer[]>) {
      state.stargazers = [...state.stargazers, ...action.payload];
      state.loading = false;
      state.loadingMore = false;
      state.error = null;
      state.success = true;
    },
    fetchStargazersFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.loadingMore = false;
      state.success = false;
    },
    resetStargazersState(state) {
      state.stargazers = [];
      state.loading = false;
      state.loadingMore = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  fetchStargazersRequest,
  fetchStargazersSuccess,
  fetchStargazersFailure,
  resetStargazersState,
} = stargazersSlice.actions;

export default stargazersSlice.reducer;
