import { action, computed, makeObservable, observable } from "mobx";
import { toast } from "react-toastify";
import { PaginatedService, Service, ServiceList, ServiceType } from "../../models/section/Section";
import { urlBase } from "../../utils/global";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class ServiceStore {
    serverIp: string = "192.168.241.51"
    static serviceStore: ServiceStore

    static getServiceStore() {
        if (this.serviceStore === undefined) {
            this.serviceStore = new ServiceStore()
        }
        return this.serviceStore
    }

    serviceTypes: Array<ServiceType> = [{
        "idServiceType": "checkOne",
        "value": "Restaurantes",
        "title": "Restaurantes",
    }, {
        "idServiceType": "checkTwo",
        "value": "Hoteles",
        "title": "Hoteles",
    }, {
        "idServiceType": "checkThree",
        "value": "Salud",
        "title": "Salud",
    },{
        "idServiceType": "checkFour",
        "value": "Ocio",
        "title": "Ocio",
    },{
        "idServiceType": "checkFive",
        "value": "Otros",
        "title": "Otros",
    }]

    //Observables =>
    paginatedService: PaginatedService = {}
    service: Service = {}
    allService: ServiceList = {}
    modalCreate: boolean = false
    modalEdit: boolean = false

    constructor() {
        makeObservable(this, {
            allService: observable,
            serviceTypes: observable,
            modalEdit: observable,
            modalCreate: observable,
            setModalCreate: action,
            getModalEdit: computed,
            getModalCreate: computed,
            paginatedService: observable,
            service: observable,
            updateService: action,
            getService: computed,
            getPaginatedServiceRequest: action,
            addRequestService: action,
            deleteService: action,
            updatePaginatedService: action,
            updateServiceList: action,
            getPaginatedService: computed,
            getAllServices: computed,
            updateAllServices: action,
            updateServiceTypes: action,
            getServiceType: computed

        })
    }
    updateAllServices(service: Service[]) {
        this.allService.services = service
    }
    get getAllServices() {
        return this.allService
    }
    updateServiceTypes(newServiceTypes: ServiceType[]) {
        this.serviceTypes = newServiceTypes
    }
    get getServiceType() {
        return this.serviceTypes
    }

    setModalEdit(mode: boolean) {
        this.modalEdit = mode
    }
    get getModalEdit() {
        return this.modalEdit
    }
    setModalCreate(mode: boolean) {
        this.modalCreate = mode
    }
    get getModalCreate() {
        return this.modalCreate
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

    async getPaginatedServiceRequest(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/services/paginated?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',

        })
        const service = await response.json()
        this.updatePaginatedService(service)
    }

    async getAllServicesRequest(locality: string) {
        const response = await fetch(`${urlBase}/services?username=${locality}`, {
            method: 'GET',

        })
        const service = await response.json()
        this.updateAllServices(service)
    }
    async deleteService(username: string, idService: string) {
        const response = await fetch(`${urlBase}/users/delete/service?username=${username}&idService=${idService}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newPaginatedService = this.paginatedService.content!!.filter((item) => item.idService !== idService)
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
    async addRequestService(username: string, service: Service, file?: File) {
        await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'servicio', 'servicio', file!!)
        service.imageUrl = imageStore.getImage.link
        const response = await fetch(`${urlBase}/users/add/service?username=${username}`, {
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
            setTimeout(function () {
                window.location.reload();
            }, 1500);
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
    async editService(locality: string, serviceID: string, service: Service, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'servicio', 'servicio', file!!)
            service.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/update/service?username=${locality}&serviceId=${serviceID}`, {
            method: 'PUT',
            body: JSON.stringify(service),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (response.ok) {
            toast.success('Se ha actualizado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        } else {
            toast.error('No se ha actualizado', {
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
}

export default ServiceStore