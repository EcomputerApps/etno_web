import { makeObservable, action, computed, observable } from "mobx";
import { Incident } from "../../models/section/Section";

class IncidentStore{
    static incidentStore : IncidentStore

    static getIncidentStore(){
        if(this.incidentStore === undefined){
            this.incidentStore = new IncidentStore()
        }
        return this.incidentStore
    }

    incidentList : Incident[] =[]

    constructor(){
        makeObservable(this, {
            incidentList : observable,
            getRequestIncident : action,
            deleteIncident : action,
            updateIncidentList : action,
            getIncidentList : computed
        })
    }
    updateIncidentList(incidents : Incident[]){
        this.incidentList= incidents
    }
    get getIncidentList(){
        return this.incidentList
    }
    async getRequestIncident(locality : string){
        const response = await fetch(`http://192.168.137.1:8080/tourism?username=${locality}`, {
            method : 'GET',
            headers : {
                'Access-Control-Allow-Origin' : '*'
            }
        })
        const incident = await response.json()
        this.updateIncidentList(incident)
    }
    async deleteIncident(locality: string, title : string){
        const response = await fetch(`http://192.168.137.1:8080/tourism?username=${locality}&title=${title}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin' : '*'

            }
        })
        const newIncidentList = this.incidentList.filter((item)=> item.title !== title)
        this.updateIncidentList(newIncidentList)
    }
}

export default IncidentStore
