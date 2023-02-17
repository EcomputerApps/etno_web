import { makeObservable, action, computed, observable } from "mobx";
import { Pharmacy, PaginatedPharmacy } from "../../models/section/Section";

class PharmacyStore {
    serverIp : string = "192.168.241.51"
    static pharmacyStore: PharmacyStore

    static getPharmacyStore() {
        if (this.pharmacyStore === undefined) {
            this.pharmacyStore = new PharmacyStore()
        }
        return this.pharmacyStore
    }

    //Observables =>
    paginatedPharmacy: PaginatedPharmacy = {}
  

    constructor() {
        makeObservable(this, {
            paginatedPharmacy: observable,
            getRequestPharmacy: action,
            addRequestPharmacy: action,
            deletePharmacy: action,
            updatePaginatedPharmacy: action,
            updatePharmacyList: action,
            getPaginatedPharmacy: computed
            
        })
    }
    updatePharmacyList(pharmacys: Pharmacy[]) {
        this.paginatedPharmacy.content = pharmacys
    }
    updatePaginatedPharmacy(paginatedPharmacy: PaginatedPharmacy) {
        this.paginatedPharmacy = paginatedPharmacy
    }
    get getPaginatedPharmacy() {
        return this.paginatedPharmacy
    }

    async getRequestPharmacy(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/pharmacies?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const pharmacy = await response.json()
        this.updatePaginatedPharmacy(pharmacy)
    }
    async deletePharmacy(username: string, name: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/pharmacy?username=${username}&name=${name}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newPaginedPharmacy = this.paginatedPharmacy.content!!.filter((item) => item.name !== name)
        this.updatePharmacyList(newPaginedPharmacy)

    }
    async addRequestPharmacy(username: string, pharmacy: Pharmacy) {
        const response = await fetch(`http://${this.serverIp}:8080/users/add/pharmacy?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(pharmacy)
        })
        if (response.ok) {
            this.paginatedPharmacy.content?.push(pharmacy)
        }
    }
}

export default PharmacyStore