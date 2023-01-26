import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { title } from "process";
import { PanelHandler } from "../../models/panel/Panel";

const initialState: PanelHandler = {
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
        }
    }
})

export const { panelHandler } = panelSlice.actions
export default panelSlice.reducer