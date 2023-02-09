import { makeObservable, action, computed, observable } from "mobx";
import { NumberLiteralType } from "typescript";
import { Incident, PaginatedIncident } from "../../models/section/Section";

class IncidentStore {
    static incidentStore: IncidentStore

    static getIncidentStore() {
        if (this.incidentStore === undefined) {
            this.incidentStore = new IncidentStore()
        }
        return this.incidentStore
    }
    //Observables =>
    paginatedIncident: PaginatedIncident = {}

    constructor() {
        makeObservable(this, {
            paginatedIncident: observable,
            getRequestIncident: action,
            deleteIncident: action,
            updateIncidentList: action,
            updatePaginatedIncident: action,
            getPaginatedIncident: computed
        })
    }
    updateIncidentList(incidents: Incident[]) {
        this.paginatedIncident.content = incidents
    }
    updatePaginatedIncident(paginatedEvent: PaginatedIncident) {
        this.paginatedIncident = paginatedEvent
    }
    get getPaginatedIncident() {
        return this.paginatedIncident
    }
    async getRequestIncident(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://192.168.137.1:8080/incidents?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const incident = await response.json()
        //console.log
        console.log(incident)
        this.updateIncidentList(incident)
    }
    async deleteIncident(username: string, title: string) {
        const response = await fetch(`http://192.168.137.1:8080/incident?username=${username}&title=${title}`, {
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
