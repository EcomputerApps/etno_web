import { makeObservable, action, computed, observable } from "mobx";
import { Advert, PaginatedAdvert } from "../../models/section/Section";

class AdvertStore {
    serverIp : string = "192.168.241.51"
    static advertStore: AdvertStore

    static getAdvertStore() {
        if (this.advertStore === undefined) {
            this.advertStore = new AdvertStore()
        }
        return this.advertStore
    }

    //Observables =>
    paginatedAdvert: PaginatedAdvert = {}


    constructor() {
        makeObservable(this, {
            paginatedAdvert: observable,
            updatePaginatedAdverts: action,
            updateAdvertList: action,
            deleteAdvert: action,
            getRequestAdvert: action,
            getPaginatedAdverts: computed

        })
    }
    updatePaginatedAdverts(paginatedAdverts: PaginatedAdvert) {
        this.paginatedAdvert = paginatedAdverts
    }
    updateAdvertList(adverts: Advert[]) {
        this.paginatedAdvert.content = adverts
    }
    get getPaginatedAdverts() {
        return this.paginatedAdvert
    }

    async getRequestAdvert(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/ads?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',

        })
        const adverts = await response.json()
        //Consol.log
        console.log(adverts)
        this.updatePaginatedAdverts(adverts)
    }


    async deleteAdvert(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/ad?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        const paginatedAdverts = this.paginatedAdvert.content!!.filter((item) => item.title !== title)
        this.updateAdvertList(paginatedAdverts)
    }

}
export default AdvertStore