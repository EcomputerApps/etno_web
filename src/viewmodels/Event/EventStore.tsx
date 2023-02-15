import { makeObservable, action, computed, observable } from "mobx";
import { Event, PaginatedEvent} from "../../models/section/Section";

class EventStore {
    static eventStore: EventStore
    serverIp : string = "192.168.241.51"

    static getEventStore(){
        if(this.eventStore === undefined){
            this.eventStore = new EventStore()
        }
        return this.eventStore
    }
    
    //Observables =>
    paginatedEvent: PaginatedEvent = { }
   
    
    constructor(){
        makeObservable(this, {
            paginatedEvent: observable,
            getRequestEvents: action,
            updatePaginatedEvents: action,
            updateEventList: action,
            deleteEvent: action,
            getPaginatedEvents: computed
           
        })
    }
    
   async getRequestEvents(locality: string, pageNum: number, elementSize: number){
    const response = await fetch(`http://${this.serverIp}:8080/events?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
        method: 'GET'
    })
    const events = await response.json()
    //console.log
    console.log(events)
    this.updatePaginatedEvents(events)
   }

   updatePaginatedEvents(paginatedEvents: PaginatedEvent){
    this.paginatedEvent = paginatedEvents
   }
   updateEventList(events: Event[]){
    this.paginatedEvent.content = events
   }
   get getPaginatedEvents(){
    return this.paginatedEvent
   }


   async deleteEvent(username: string, title: string){
    const response = await fetch(`http://192.168.241.51:8080/users/delete/event?username=${username}&title=${title}`, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    const newPaginatedEvents = this.paginatedEvent.content!!.filter((item)=> item.title !== title)
        this.updateEventList(newPaginatedEvents)
   }
}
export default EventStore