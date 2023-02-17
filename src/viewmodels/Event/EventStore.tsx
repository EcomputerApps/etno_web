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
            toast.success('Se ha añadido exitosamente', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }else{
            toast.error('No se ha añadido exitosamente', {
                position: 'top-center',
                autoClose: 1000,
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
   get getPaginatedEvents(){
    return this.paginatedEvent
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
        toast.success('Se ha eliminado exitosamente', {
            position: 'top-center',
            autoClose: 1000,
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
            autoClose: 1000,
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