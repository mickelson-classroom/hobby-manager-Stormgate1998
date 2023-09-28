import { configureStore } from '@reduxjs/toolkit';
import weaponReducer from './features/weapon-slice';


export const store = configureStore({
    reducer: {
        weapon: weaponReducer,
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;