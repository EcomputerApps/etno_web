import { action, computed, makeObservable, observable } from "mobx";
import { PaginatedService, Service } from "../../models/section/Section";

class ServiceStore {
    static serviceStore: ServiceStore

    static getServiceStore() {
        if (this.serviceStore === undefined) {
            this.serviceStore = new ServiceStore()
        }
        return this.serviceStore
    }

    //Observables =>
    paginatedService: PaginatedService = {}
    


    constructor() {
        makeObservable(this, {
            paginatedService: observable,
            getRequestService: action,
            deleteService: action,
            updatePaginatedService: action,
            updateServiceList: action,
            getPaginatedService: computed
          
        })
    }
    updateServiceList(services: Service[]) {
        this.paginatedService.content = services
    }
      updatePaginatedService(paginatedService: PaginatedService) {
        this.paginatedService = paginatedService
    }
    get getPaginatedService() {
        return this.paginatedService
    }
    async getRequestService(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://192.168.137.1:8080/service?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',

        })
        const service = await response.json()
        //console.log
        console.log(service)
        this.updateServiceList(service)
    }
    async deleteService(username: string, owner: string) {
        const response = await fetch(`http://192.168.137.1:8080/users/delete/service?username=${username}&owner=${owner}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newPaginatedService = this.paginatedService.content!!.filter((item) => item.owner !== owner)
        this.updateServiceList(newPaginatedService)
    }
}

export default ServiceStore