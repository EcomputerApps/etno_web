import { makeObservable, action, computed, observable } from "mobx";
import { Event, PaginatedEvent} from "../../models/section/Section";

class EventStore {
    static eventStore: EventStore

    static getEventStore(){
        if(this.eventStore === undefined){
            this.eventStore = new EventStore()
        }
        return this.eventStore
    }
    
    //Observables =>
    paginatedEvent: PaginatedEvent = { }
    dectectedTableEmpty: boolean = false
    
    constructor(){
        makeObservable(this, {
            paginatedEvent: observable,
            dectectedTableEmpty: observable,
            getRequestEvents: action,
            updatePaginatedEvents: action,
            updateEventList: action,
            updateDetectedTableEmpty: action,
            deleteEvent: action,
            getPaginatedEvents: computed,
            getDetectedTableEmpty: computed
        })
    }
    
   async getRequestEvents(locality: string, pageNum: number, elementSize: number){
    const response = await fetch(`http://192.168.137.1:8080/events?username=Bolea&pageNum=${pageNum}&elementSize=${elementSize}`, {
        method: 'GET'
    })
    const events = await response.json()
    console.log(events)
    this.updatePaginatedEvents(events)
   }

   updatePaginatedEvents(paginatedEvents: PaginatedEvent){
    this.paginatedEvent = paginatedEvents
   }
   updateEventList(events: Event[]){
    this.paginatedEvent.content = events
   }
   updateDetectedTableEmpty(detectedTableEmpty: boolean){
    this.dectectedTableEmpty = detectedTableEmpty
   }

   get getPaginatedEvents(){
    return this.paginatedEvent
   }
   get getDetectedTableEmpty(): boolean{
    return this.dectectedTableEmpty
   }

   async deleteEvent(username: string, title: string){
    const response = await fetch(`http://192.168.137.1:8080/users/delete/event?username=${username}&title=${title}`, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    const paginatedEvents = this.paginatedEvent.content!!.filter((item)=> item.title !== title)
        this.updateEventList(paginatedEvents)
   }
}
export default EventStore