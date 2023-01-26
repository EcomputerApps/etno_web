import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "../features/sidebar/panels_slice";

export const store = configureStore({
    reducer: {
        panelStore: panelReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>