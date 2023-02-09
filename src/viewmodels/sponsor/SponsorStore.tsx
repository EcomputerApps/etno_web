import { makeObservable, action, computed, observable } from "mobx";
import { PaginatedSponsor, Sponsor } from "../../models/section/Section";

class SposnsorStore {
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
        const response = await fetch(`http://192.168.137.1:8080/sponsor?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const sponsor = await response.json()
        this.updateSponsorList(sponsor)
    }
    async deleteSponsor(username: string, title: string) {
        const response = await fetch(`http://192.168.137.1:8080/users/delete/sponsor?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newPaginatedSponsor = this.paginatedSponsor.content!.filter((item) => item.title !== title)
        this.updateSponsorList(newPaginatedSponsor)
    }


}

export default SposnsorStore