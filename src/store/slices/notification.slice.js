import fetchAPI from '@/common/Hooks/fetchAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUserNotifications = createAsyncThunk(
    '/admin/notification/getUserNotifications',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: `${process.env.NEXT_PUBLIC_API_URL}/admin/notification/getUserNotifications`,
                method: "POST",
                body: payload,
            });
            return response;
        } catch (error) {
            rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

export const markAsRead = createAsyncThunk(
    '/admin/notification/markAsRead',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: `${process.env.NEXT_PUBLIC_API_URL}/admin/notification/markAsRead`,
                method: "POST",
                body: payload,
            });
            return response;
        } catch (error) {
            rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        newNotifications: null,
        loading: false,
    },
    reducers: {
        addNotification: (state, action) => {
            state.newNotifications = action.payload;
        },
        clearNotifications: (state) => {
            state.newNotifications = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserNotifications.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === true) {
                    state.notifications = action.payload.result.list;
                } else {
                    state.notifications = [];
                }
            })
            .addCase(getUserNotifications.rejected, (state, action) => {
                state.loading = false;
            });
    }
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;