import { makeObservable, action, computed, observable } from "mobx";
import { Band } from "../../models/section/Section";

class BandStore{
    static bandStore: BandStore

    static getBandStore(){
        if(this.bandStore === undefined){
            this.bandStore = new BandStore()
        }
        return this.bandStore
    }

    bandList: Band[] = []

    constructor(){
        makeObservable(this, {
            bandList:observable,
            getRequestBand : action,
            deleteBand: action,
            updateBandList: action,
            getBandList: computed
        })
    }

    async getRequestBand(locality : string){
        const response = await fetch(`http://192.168.137.1:8080/band?username=${locality}`,{
            method: 'GET',
            headers:{
                'Access-Control-Allow-Origin': '*',
            }
        }) 
        const band = await response.json()
        this.updateBandList(band)
    }
    async deleteBand( locality : string, title: string){
        const response = await fetch(`http://192.168.137.1:8080/users/delete/tourism?username=${locality}&title=${title}`,{
            method: 'DELETE',
            headers:{
                'Access-Control-Allow-Origin':'*',
            }
        })
        const newBandList = this.bandList.filter((item)=>item.title !==title)
        this.updateBandList(newBandList)
    }
    updateBandList(bands: Band[]){
        this.bandList = bands
    }
    get getBandList(){
        return this.bandList
    }

          
    
}
export default BandStore