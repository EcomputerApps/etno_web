import { makeObservable, action, computed, observable } from "mobx";
import { json } from "react-router-dom";
import { Sponsor } from "../../models/section/Section";

class SposnsorStore{
    static sponsorStore: SposnsorStore

    static getSponsorStore(){
        if(this.sponsorStore=== undefined){
            this.sponsorStore = new SposnsorStore()
        }
        return this.sponsorStore
    }

    sposnsorList: Sponsor[] = []

    constructor(){
        makeObservable(this, {
            sposnsorList:observable,
            getRequestSponsor: action,
            deleteSponsor: action,
            updateSponsorList: action,
            getSponsorList: computed
        })
    }

    async getRequestSponsor( locality : string){
        const response = await fetch(`http://192.168.137.1:8080/band?username=${locality}`,{
            method: 'GET',
            'headers' :{
                'Access-Control-Allow-Origin' : '*'
            }
        })
        const sponsor = await response.json()
        this.updateSponsorList(sponsor)
    }
    async deleteSponsor( locality : string, title : string){
        const response = await fetch(`http://192.168.137.1:8080/users/delete/tourism?username=${locality}&title=${title}`,{
           method: 'DELETE',
           'headers': {
            'Access-Control-Allow-Origin' : '*'
           } 
        })
        const newSponsorList = this.sposnsorList.filter((item)=> item.title !== title)
        this.updateSponsorList(newSponsorList)
    }

    updateSponsorList( sponsors: Sponsor[]){
        return this.sposnsorList = sponsors
    }
    get getSponsorList(){
        return this.sposnsorList
    }
}

export default SposnsorStore