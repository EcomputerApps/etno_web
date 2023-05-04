import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Incident, PaginatedIncident } from "../../models/section/Section";
import { urlBase } from "../../utils/global";

class IncidentStore {
    serverIp: string = "192.168.241.51"
    static incidentStore: IncidentStore

    static getIncidentStore() {
        if (this.incidentStore === undefined) {
            this.incidentStore = new IncidentStore()
        }
        return this.incidentStore
    }
    //Observables =>
    paginatedIncident: PaginatedIncident = {}
    description: string = ""
    incidentsListChecked: Incident[] = []


    constructor() {
        makeObservable(this, {
            paginatedIncident: observable,
            description: observable,
            updateDescription: action,
            getPaginatedIncidentsRequest: action,
            deleteIncident: action,
            updateIncidentList: action,
            updatePaginatedIncident: action,
            getPaginatedIncident: computed,
            getDescription: computed,
            getIncidentsCheckedList: computed,
            incidentsListChecked: observable
           
        })
    }
    updateIncidentList(incidents: Incident[]) {
        this.paginatedIncident.content = incidents
    }
    updatePaginatedIncident(paginatedEvent: PaginatedIncident) {
        this.paginatedIncident = paginatedEvent
    }
    updateDescription(description: string) {
        this.description = description
    }
    get getDescription() {
        return this.description
    }
    get getPaginatedIncident() {
        return this.paginatedIncident
    }
    get getIncidentsCheckedList(){
        return this.incidentsListChecked
    }
    async getPaginatedIncidentsRequest(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/incidents/paginated?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const incident = await response.json()
        this.updatePaginatedIncident(incident)
    }
    async deleteIncident(username: string, title: string) {
        const response = await fetch(`${urlBase}/incident?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newPaginatedIncidentList = this.paginatedIncident.content!!.filter((item) => item.title !== title)
        this.updateIncidentList(newPaginatedIncidentList)
    }
    async solveSilution(locality: string, incidentId: string, solution:string) {
              const response = await fetch(`${urlBase}/users/solve/incidence?username=${locality}&incidentId=${incidentId}&solution=${solution}`,{
            method: 'PUT',
       
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
            setTimeout(function(){
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
    async deleteAllById(locality: string) {
        const response = await fetch(`${urlBase}/incidents/delete/some?username=${locality}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.incidentsListChecked)
        })
        if(response.ok){
            toast.success('Se han borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
          setTimeout(function(){
            window.location.reload();
         }, 1500);
        }else{
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
}

export default IncidentStore
