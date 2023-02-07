import { makeObservable, action, computed, observable } from "mobx";
import { Advert } from "../../models/section/Section";

class AdvertStore {
    static advertStore: AdvertStore

    static getAdvertStore() {
        if (this.advertStore === undefined) {
            this.advertStore = new AdvertStore()
        }
        return this.advertStore
    }

    advertList: Advert[] = []

    constructor() {
        makeObservable(this, {
            advertList: observable,
            getRequestAdvert: action,
            deleteAdvert: action,
            updateAdvertList: action,
            getAdvertList: computed
        })
    }
    updateAdvertList(adverts: Advert[]) {
        this.advertList = adverts
    }
    get getAdvertList() {
        return this.advertList
    }
    async getRequestAdvert(locality: string) {
        const response = await fetch(`http://192.168.137.1:8080/ads?username=${locality}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        const advert = await response.json()
        this.updateAdvertList(advert)
    }
 

    async deleteAdvert(locality: string, title: string) {
        const response = await fetch(`http://192.168.137.1:8080/users/delete/ad?username=${locality}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        const newList = this.advertList.filter((item) => item.title !== title)
            this.updateAdvertList(newList)
    }
    
}
export default AdvertStore