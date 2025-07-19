import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  AuthState,
  RecentlyBrowsedItem,
  User,
} from "../interfaces/SliceInterfaces";
import type { RootState } from "./store";

const initialState: AuthState = {
  users: [],
  isAuthenticated: false,
  recentlyBrowsed: [],
  currentUser: {},
  error: {
    registerError: null,
    loginError: null,
    forgetError: null,
  },
};

export const registerUser = createAsyncThunk<
  User,
  User,
  { state: RootState; rejectValue: string }
>(
  "auth/register",
  async (
    { userId, username, email, password },
    { getState, rejectWithValue }
  ) => {
    const state = getState();
    const users = state?.auth?.users || [];

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return rejectWithValue("User Already Exists!");
    }

    await new Promise((res) => setTimeout(res, 300));
    return { userId, username, email, password };
  }
);

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { state: RootState; rejectValue: string }
>("auth/login", async ({ email, password }, { getState, rejectWithValue }) => {
  const state = getState();
  const users = state?.auth?.users || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return rejectWithValue("Invalid Email Or Password");
  }

  return user;
});

export const updatePassword = createAsyncThunk<
  { email: string; newpassword: string },
  { email: string; newpassword: string },
  { state: RootState; rejectValue: string }
>(
  "auth/updatePassword",
  async ({ email, newpassword }, { getState, rejectWithValue }) => {
    const state = getState();
    const users = state?.auth?.users || [];

    const user = users.find((u) => u.email === email);
    if (!user) {
      return rejectWithValue("User Doesnot Exist!");
    }

    if (user.password === newpassword) {
      return rejectWithValue("Cannot use existing password");
    }

    return { email, newpassword };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = {
        registerError: null,
        loginError: null,
        forgetError: null,
      };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = {};
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(
        (user) => user.userId !== action.payload
      );

      state.currentUser = {};
    },
    recentlyBrowsed: (state, action: PayloadAction<RecentlyBrowsedItem>) => {
      const { id, userId } = action.payload;

      if (!state.recentlyBrowsed) {
        state.recentlyBrowsed = [];
      }

      const userItems = state.recentlyBrowsed.filter(
        (item) => item.userId === userId
      );
      const alreadyExists = userItems.some((item) => item.id === id);

      if (!alreadyExists) {
        state.recentlyBrowsed = state.recentlyBrowsed.filter(
          (item) => item.userId !== userId
        );

        if (userItems.length >= 4) {
          userItems.shift();
        }

        state.recentlyBrowsed.push(...userItems, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.fulfilled, (state, action) => {
        if (!Array.isArray(state.users)) {
          state.users = [];
        }
        state.users.push(action.payload);
        state.error.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error.registerError = action.payload ?? null;
      })

      // Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error.loginError = action.payload ?? null;
      })

      // Update password
      .addCase(updatePassword.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(
          (u) => u.email === action.payload.email
        );
        if (userIndex !== -1) {
          state.users[userIndex].password = action.payload.newpassword;
        }
        state.error.forgetError = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.error.forgetError = action.payload ?? null;
      });
  },
});

export const { clearErrors, logout, recentlyBrowsed, deleteUser } =
  authSlice.actions;
export default authSlice.reducer;
