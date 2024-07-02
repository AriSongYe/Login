import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from './index' // Adjust the path as necessary

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    loading: false,
    error: null,
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async(_, { rejectWithValue }) => {
    const url = process.env.REACT_APP_NODE_URL;
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return rejectWithValue('Please Login!');

    try {
        const response = await axios.post(url + '/api/identifier', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        if (response.data === 'Success') {
            return accessToken;
        } else {
            localStorage.setItem('accessToken', response.data.accessToken);
            console.log(response.data);
            return response.data.accessToken; // 성공 시 반환되는 값
        }
    } catch(error) {
        console.log(`Axios Error: ${error}`);
        rejectWithValue('Axios Error!');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        initializeAuthState: (state, action: PayloadAction<{ isAuthenticated: boolean; accessToken: string | null}>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.accessToken = action.payload.accessToken;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.accessToken = null;
                state.error = action.payload;
            });
    }
});

export const authActions = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;