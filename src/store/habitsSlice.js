import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Thunk: traer hábitos desde el backend
export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const res = await fetch("http://localhost:3001/habits");
  if (!res.ok) throw new Error("Error obteniendo hábitos");
  return await res.json();
});

const habitsSlice = createSlice({
  name: "habits",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default habitsSlice.reducer;