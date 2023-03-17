import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Incident, PaginatedIncident } from "../../models/section/Section";

class IncidentStore {
    serverIp: string = "192.168.137.1"
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


    constructor() {
        makeObservable(this, {
            paginatedIncident: observable,
            description: observable,
            updateDescription: action,
            getRequestIncident: action,
            deleteIncident: action,
            updateIncidentList: action,
            updatePaginatedIncident: action,
            getPaginatedIncident: computed,
            getDescription: computed,
           
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
    async getRequestIncident(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/incidents?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const incident = await response.json()
        this.updatePaginatedIncident(incident)
    }
    async deleteIncident(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/incident?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newPaginatedIncidentList = this.paginatedIncident.content!!.filter((item) => item.title !== title)
        this.updateIncidentList(newPaginatedIncidentList)
    }
    async solveSilution(locality: string, incidentId: string, solution:string) {
              const response = await fetch(`http://${this.serverIp}:8080/users/solve/incidence?username=${locality}&incidentId=${incidentId}&solution=${solution}`,{
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
}

export default IncidentStore
