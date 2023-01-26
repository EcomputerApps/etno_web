import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PanelHandler } from "../../models/panel/Panel";

const initialState: PanelHandler = {
    section: 'Eventos',
    open: true,
    menu: 
    [
        {title: 'Eventos', src: "event.svg"},
        {title: 'Turismo', src: "tourism.svg", gap: true},
        {title: 'Bandos', src: "bando.svg"},
        {title: 'Servicios', src: "service.svg", gap: true},
        {title: 'Patrocinadores', src: "sponsor.svg"},
        {title: 'Noticias', src: "new.svg"}
    ]
}

const panelSlice = createSlice({
    name: 'open',
    initialState,
    reducers: {
        panelHandler(state){
            state.open ? state.open = false : state.open = true 
        },
        updateSection(state, action: PayloadAction<string>){
            state.section = action.payload
        }
    }
})

export const { panelHandler, updateSection } = panelSlice.actions
export default panelSlice.reducer