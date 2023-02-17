import { makeObservable, action, computed, observable } from "mobx";
import { PaginatedSponsor, Sponsor } from "../../models/section/Section";

class SposnsorStore {
    serverIp : string = "192.168.241.51"
    static sponsorStore: SposnsorStore

    static getSponsorStore() {
        if (this.sponsorStore === undefined) {
            this.sponsorStore = new SposnsorStore()
        }
        return this.sponsorStore
    }

    //Observables =>
    paginatedSponsor: PaginatedSponsor = {}


    constructor() {
        makeObservable(this, {
            paginatedSponsor: observable,
            getRequestSponsor: action,
            addRequestSponsor: action,
            deleteSponsor: action,
            updatePaginatedSponsor: action,
            updateSponsorList: action,
            getPaginatedSponsor: computed

        })
    }
    updateSponsorList(sponsors: Sponsor[]) {
        this.paginatedSponsor.content = sponsors
    }

    updatePaginatedSponsor(paginatedSponsor: PaginatedSponsor) {
        this.paginatedSponsor = paginatedSponsor
    }
    get getPaginatedSponsor() {
        return this.paginatedSponsor
    }


    async getRequestSponsor(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/sponsors?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const sponsor = await response.json()
        this.updatePaginatedSponsor(sponsor)
    }
    
    async deleteSponsor(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/sponsor?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newSponsors = this.paginatedSponsor.content!.filter((item) => item.title !== title)
        this.updateSponsorList(newSponsors)
    }

    async addRequestSponsor(username: string, sponsor: Sponsor) {
        const response = await fetch(`http://${this.serverIp}:8080/users/add/sponsor?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(sponsor)
        })
        if (response.ok) {
            this.paginatedSponsor.content?.push(sponsor)
        }
    }


}

export default SposnsorStore