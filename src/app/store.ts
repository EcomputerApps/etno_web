import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "../features/sidebar/panels_slice";
import eventReducer from "../features/event/event_slice";

export const store = configureStore({
    reducer: {
        panelStore: panelReducer,
        eventStore: eventReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>