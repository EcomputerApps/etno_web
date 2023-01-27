import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventList } from "../../models/section/Section";

const initialState: EventList = {
   list: [{}]
}

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEventList(state, action){
            state.list = action.payload
        },
        deleteEventList(state, action){
            const newList = state.list.filter((item) => item.title !== action.payload)
            state.list = newList
        }
    }
})
export const getEvents = () => async(dispatch: any, getState: any) => {
    const response = await fetch('http://192.168.137.1:8080/events?username=Bolea',  {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
    }),
})
    const events = await response.json()

    console.log(events)
    dispatch(setEventList(events))
}
export const deleteEvent = (username: string, title: string) => async(dispatch: any, getState: any) => {
    const response = await fetch(`http://192.168.137.1:8080/users/delete/event?username=${username}&title=${title}`,{
        method: 'DELETE'
    })
    dispatch(deleteEventList(title))
}

export const { setEventList, deleteEventList } = eventSlice.actions
export default eventSlice.reducer