import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification() {
            return '';
        },
    },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setTimedNotification = (message, timeInSeconds = 5) => (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
        dispatch(clearNotification());
    }, timeInSeconds * 1000);
};

export default notificationSlice.reducer;
