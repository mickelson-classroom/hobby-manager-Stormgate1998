import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ToastObj} from '../components/Toaster/Toast';
import { ToastProps } from '../components/Toaster/Toast';

interface ToastState {
    toasts: ToastObj[],
}

const initialState: ToastState={
    toasts: []
}

const toastSlice = createSlice({
    name: "toasts",
    initialState,
    reducers: {
        addToast(state, action: PayloadAction<ToastObj>){
            state.toasts = [...state.toasts, action.payload]
        },
        removeToast(state, action: PayloadAction<string>){
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        },
        removeAllToasts(state){
            state.toasts = []
        },
    }
});

export const  {addToast,removeAllToasts, removeToast} = toastSlice.actions;
export default toastSlice.reducer;