import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api';

const defaultTeamMembers = [];

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const fetchTeamMembers = createAsyncThunk(
  'teamMembers/fetchTeamMembers',
  async (params = {}, { getState }) => {
    try {
      const response = await apiService.getTeamMembers(params);
      let newMembers = [];
      if (response.data?.success && Array.isArray(response.data?.data)) {
        newMembers = response.data.data;
      } else if (Array.isArray(response.data)) {
        newMembers = response.data;
      } else {
        newMembers = defaultTeamMembers;
      }

      const cached = getState().teamMembers?.teamMembers || defaultTeamMembers;
      const hasChanged = !isEqual(newMembers, cached);

      return {
        teamMembers: newMembers,
        hasChanged,
        timestamp: Date.now(),
      };
    } catch (error) {
      const state = getState();
      return {
        teamMembers: state.teamMembers?.teamMembers || defaultTeamMembers,
        hasChanged: false,
        timestamp: state.teamMembers?.lastFetched || Date.now(),
        error: error.message,
      };
    }
  }
);

const initialState = {
  teamMembers: defaultTeamMembers,
  loading: false,
  error: null,
  lastFetched: null,
  needsRefresh: false,
};

const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState,
  reducers: {
    refreshTeamMembers: (state) => {
      state.needsRefresh = true;
    },
    clearTeamMembersCache: (state) => {
      state.teamMembers = defaultTeamMembers;
      state.lastFetched = null;
      state.needsRefresh = false;
      state.error = null;
    },
    resetNeedsRefresh: (state) => {
      state.needsRefresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        const { teamMembers, hasChanged, timestamp, error } = action.payload;
        state.loading = false;
        state.error = error || null;
        if (hasChanged) {
          state.teamMembers = teamMembers;
          state.lastFetched = timestamp;
        } else {
          state.lastFetched = timestamp;
        }
        state.needsRefresh = false;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch team members';
        state.needsRefresh = false;
      });
  },
});

export const { refreshTeamMembers, clearTeamMembersCache, resetNeedsRefresh } = teamMembersSlice.actions;

export const selectTeamMembers = (state) => state.teamMembers.teamMembers;
export const selectTeamMembersLoading = (state) => state.teamMembers.loading;
export const selectTeamMembersError = (state) => state.teamMembers.error;
export const selectTeamMembersLastFetched = (state) => state.teamMembers.lastFetched;
export const selectTeamMembersNeedsRefresh = (state) => state.teamMembers.needsRefresh;
export const selectShouldFetchTeamMembers = (state) => {
  const { teamMembers, lastFetched, needsRefresh } = state.teamMembers;
  return needsRefresh || !lastFetched || !teamMembers || teamMembers.length === 0;
};

export default teamMembersSlice.reducer;

