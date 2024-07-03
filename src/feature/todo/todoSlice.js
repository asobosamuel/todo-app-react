import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  loading: false,
  error: "",
};

const fetchTodos = createAsyncThunk("todo/fetchTodos", () => {
  return axios
    .get("https://todo-app-react-m2a3.onrender.com/todos")
    .then((response) => response.data);
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.todos = action.payload.reverse();
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.error.message;
      console.log(state.error);
    });
  },
});

export default todoSlice.reducer;
export { fetchTodos };
