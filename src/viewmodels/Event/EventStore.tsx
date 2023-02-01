import { makeObservable, action, computed, observable } from "mobx";
import { Event} from "../../models/section/Section";


class EventStore {
    static eventStore: EventStore

    static getEventStore(){
        if(this.eventStore === undefined){
            this.eventStore = new EventStore()
        }
        return this.eventStore
    }
    
    //Observables =>
    eventList: Event[] = []
    
    constructor(){
        makeObservable(this, {
            eventList: observable,
            getRequestEvents: action,
            updateEventList: action,
            deleteEvent: action,
            getEvents: computed
        })
    }
    
   async getRequestEvents(){
    const response = await fetch('http://192.168.137.1:8080/events?username=Bolea', {
        method: 'GET',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    })
    const events = await response.json()
    this.updateEventList(events)
   }

   updateEventList(event: Event[]){
    this.eventList = event
   }

   get getEvents(){
    return this.eventList
   }

   async deleteEvent(username: string, title: string){
    const response = await fetch(`http://192.168.137.1:8080/users/delete/event?username=${username}&title=${title}`, {
        method: 'DELETE',
        'headers': {
            'Access-Control-Allow-Origin': '*'
        }
    })
    const newList = this.eventList.filter((item) => item.title !== title)
            this.updateEventList(newList)
   }
}
export default EventStore