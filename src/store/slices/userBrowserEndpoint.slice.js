import fetchAPI from '@/common/Hooks/fetchAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUserBrowserEndpoints = createAsyncThunk(
    '/admin/allowNotification/getUserBrowserEndpoints',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchAPI({
                url: `${process.env.NEXT_PUBLIC_API_URL}/admin/allowNotification/getUserBrowserEndpoints`,
                method: "POST",
                body: payload,
            });
            return response;
        } catch (error) {
            rejectWithValue(error?.response?.data?.message || error?.message);
        }
    }
);

const allowNotificationSlice = createSlice({
    name: 'allowNotification',
    initialState: {
        userBrowserEndpoints: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserBrowserEndpoints.pending, (state) => {
                state.loading = true;
                state.userBrowserEndpoints = null;
            })
            .addCase(getUserBrowserEndpoints.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.success === true) {
                    state.userBrowserEndpoints = action.payload.result.list;
                } else {
                    state.userBrowserEndpoints = null;
                }
            })
            .addCase(getUserBrowserEndpoints.rejected, (state, action) => {
                state.loading = false;
                state.userBrowserEndpoints = null;
            });
    }
});

export default allowNotificationSlice.reducer;