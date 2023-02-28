import { makeObservable, action, computed, observable } from "mobx";
import { Incident, PaginatedIncident } from "../../models/section/Section";

class IncidentStore {
    serverIp : string = "192.168.241.51"
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
        const response = await fetch(`http://${this.serverIp}:8080/incident?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const incident = await response.json()
        this.updateIncidentList(incident)
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
}

export default IncidentStore
