import { configureStore } from '@reduxjs/toolkit';
import weaponReducer from './features/weapon-slice';
import toastReducer  from './features/toast-slice';

export const store = configureStore({
    reducer: {
        weapon: weaponReducer,
        toast: toastReducer,
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;