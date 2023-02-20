import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Event, PaginatedEvent} from "../../models/section/Section";

class EventStore {
    static eventStore: EventStore
    serverIp : string = "192.168.137.1"

    static getEventStore(){
        if(this.eventStore === undefined){
            this.eventStore = new EventStore()
        }
        return this.eventStore
    }
    
    //Observables =>
    paginatedEvent: PaginatedEvent = { }
    event: Event = {}
   
    constructor(){
        makeObservable(this, {
            paginatedEvent: observable,
            event: observable,
            getRequestEvents: action,
            updatePaginatedEvents: action,
            updateEventList: action,
            updateEvent: action,
            deleteEvent: action,
            getPaginatedEvents: computed,
            getEvent: computed
        })
    }
    
    async addRequestEvent(locality: string, event: Event){
        const response = await fetch(`http://${this.serverIp}:8080/users/add/event?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if(response.ok){
            this.paginatedEvent.content?.push(event)
            this.event = event
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 100,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }else{
            toast.error('No se ha añadido correctamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
    }
}
   async getRequestEvents(locality: string, pageNum: number, elementSize: number){
    const response = await fetch(`http://${this.serverIp}:8080/events?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
        method: 'GET'
    })
    const events = await response.json()
    this.updatePaginatedEvents(events)
   }

   updatePaginatedEvents(paginatedEvents: PaginatedEvent){
    this.paginatedEvent = paginatedEvents
   }
   updateEventList(events: Event[]){
    this.paginatedEvent.content = events
   }
   updateEvent(event: Event){
    this.event = event
   }

   get getPaginatedEvents(){
    return this.paginatedEvent
   }
   get getEvent(){
    return this.event
   }

   async deleteEvent(username: string, title: string){
    const response = await fetch(`http://${this.serverIp}:8080/users/delete/event?username=${username}&title=${title}`, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })

    if(response.ok){
        const newPaginatedEvents = this.paginatedEvent.content!!.filter((item)=> item.title !== title)
        this.updateEventList(newPaginatedEvents)
        this.updateEvent({})
        toast.success('Se ha eliminado exitosamente', {
            position: 'top-center',
            autoClose: 100,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
      })
    }else{
        toast.error('No se ha eliminado exitosamente', {
            position: 'top-center',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
      }) 
    }
   }
}
export default EventStore