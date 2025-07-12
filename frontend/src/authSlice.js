import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, thunkAPI) => {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include'
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      return thunkAPI.rejectWithValue(`Status: ${response.status}`);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
        state.loading = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
