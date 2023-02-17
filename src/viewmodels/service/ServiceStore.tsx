import { action, computed, makeObservable, observable } from "mobx";
import { PaginatedService, Service } from "../../models/section/Section";

class ServiceStore {
    serverIp : string = "192.168.241.51"
    static serviceStore: ServiceStore

    static getServiceStore() {
        if (this.serviceStore === undefined) {
            this.serviceStore = new ServiceStore()
        }
        return this.serviceStore
    }

    //Observables =>
    paginatedService: PaginatedService = {}
<<<<<<< HEAD
    
=======



>>>>>>> 239c3b1a73a06a8e52432f33ca86b8bbbac14607
    constructor() {
        makeObservable(this, {
            paginatedService: observable,
            getRequestService: action,
            addRequestService: action,
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
        const response = await fetch(`http://${this.serverIp}:8080/services?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',

        })
        const service = await response.json()
        this.updatePaginatedService(service)
    }
    async deleteService(username: string, owner: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/service?username=${username}&owner=${owner}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newPaginatedService = this.paginatedService.content!!.filter((item) => item.owner !== owner)
        this.updateServiceList(newPaginatedService)
    }

    async addRequestService(username: string, service: Service) {
        const response = await fetch(`http://${this.serverIp}:8080/users/add/service?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(service)
        })
        if (response.ok) {
            this.paginatedService.content?.push(service)
        }
    }
}

export default ServiceStore