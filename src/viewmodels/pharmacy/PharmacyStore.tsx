import { makeObservable, action, computed, observable } from "mobx";
import { Pharmacy } from "../../models/section/Section";

class PharmacyStore{
    static pharmacyStore: PharmacyStore

    static getPharmacyStore(){
        if(this.pharmacyStore===undefined){
            this.pharmacyStore = new PharmacyStore()
        }
        return this.pharmacyStore
    }

    pharmacyList : Pharmacy[] = []

    constructor(){
        makeObservable(this,{
            pharmacyList: observable,
            getRequestPharmacy : action,
            deletePharmacy : action,
            updatePharmacyList: action,
            getPharmacyList: computed
        })

    }
    updatePharmacyList( pharmacys : Pharmacy[]){
        this.pharmacyList = pharmacys
    }
    get getPharmacyList(){
        return this.pharmacyList
    }

    async getRequestPharmacy( locality : string){
        const response = await fetch(`http://192.168.137.1:8080/band?username=${locality}`,{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        })
        const pharmacy = await response.json()
        this.updatePharmacyList(pharmacy)
    }
    async deletePharmacy(locality : string, name : string){
        const response = await fetch(`http://192.168.137.1:8080/band?username=${locality}&name=${name}`,{
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin' : '*'
            }
     })
     const newPharmacyList = this.pharmacyList.filter((item)=>item.name !==name)
     this.updatePharmacyList(newPharmacyList)
        
}
}

export default PharmacyStore