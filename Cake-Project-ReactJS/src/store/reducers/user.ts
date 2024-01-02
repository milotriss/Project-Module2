import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login } from "../../components/login/login";
import UserService from "../../services/users.service";
import { notifyError } from "../../common/toastify";

export const handleLogin = createAsyncThunk(
  "login",
  async (formRequest: Login) => {
    try {
      const userService: UserService = new UserService();
      const response = await userService.login(formRequest);
      return response;
    } catch (error) {
      return error
    }
  }
);

export const userSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: false,
    data: undefined,
  },
  reducers: {
    logout: (state) => {
      state.data = undefined
      localStorage.removeItem("token")
      localStorage.removeItem("idUser")
    }
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});
export const {logout} = userSlice.actions