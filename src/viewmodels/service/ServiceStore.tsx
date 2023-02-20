import { action, computed, makeObservable, observable } from "mobx";
import { toast } from "react-toastify";
import { PaginatedService, Service } from "../../models/section/Section";

class ServiceStore {
    serverIp : string = "192.168.137.1"
    static serviceStore: ServiceStore

    static getServiceStore() {
        if (this.serviceStore === undefined) {
            this.serviceStore = new ServiceStore()
        }
        return this.serviceStore
    }

    //Observables =>
    paginatedService: PaginatedService = {}
    service: Service = {}


    constructor() {
        makeObservable(this, {
            paginatedService: observable,
            service: observable,
            updateService: action,
            getService: computed,
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
    updateService(service: Service) {
        this.service = service
    }
    get getService() {
        return this.service
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
        if (response.ok) {
            const newPaginatedService = this.paginatedService.content!!.filter((item) => item.owner !== owner)
            this.updateServiceList(newPaginatedService)
            this.updateService({})
            toast.success('Se ha borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            toast.error('No se ha podido borrar', {
                position: 'bottom-center',
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
            this.service = service
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
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
}

export default ServiceStore