import { action, computed, makeObservable, observable } from "mobx";
import { Service } from "../../models/section/Section";

class ServiceStore{
    static serviceStore: ServiceStore

    static getServiceStore(){
        if(this.serviceStore === undefined){
            this.serviceStore = new ServiceStore()
        }
        return this.serviceStore
    }

    serviceList : Service[] = []

    constructor(){
        makeObservable(this,{
           serviceList : observable,
           getRequestService : action,
           deleteService : action, 
           updateServiceList : action,
           getServiceList: computed 
        })
    }
    updateServiceList(services : Service[]){
        this.serviceList = services
    }
    get getServiceList(){
        return this.serviceList
    }
    async getRequestService( locality : string){
        const response = await fetch(`http://192.168.137.1:8080/tourism?username=${locality}`, {
            method: 'GET',
            'headers':{
                'Access-Control-Allow-Origin': '*'
            }
        })
        const service = await response.json()
        this.updateServiceList(service)
    }
    async deleteService(locality : string, category: string){
        const response = await fetch(`http://192.168.137.1:8080/tourism?username=${locality}&title=${category}`,{
            method: 'DELETE',
            'headers' : {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newList = this.serviceList.filter((item)=> item.category !==category)
        this.updateServiceList(newList)
    }
}

export default ServiceStore