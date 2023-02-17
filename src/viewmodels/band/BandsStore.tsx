import { makeObservable, action, computed, observable } from "mobx";
import { Band, PaginatedBand } from "../../models/section/Section";

class BandStore{
    serverIp : string = "192.168.137.1"
    static bandStore: BandStore

    static getBandStore(){
        if(this.bandStore === undefined){
            this.bandStore = new BandStore()
        }
        return this.bandStore
    }
    //Observables =>
paginatedBand : PaginatedBand = {}


    constructor(){
        makeObservable(this, {
            paginatedBand:observable,
            getRequestBand : action,
            deleteBand: action,
            updateBandList: action,
            updatePaginatedBand: action,
            getPaginatedBands: computed
        })
    }
    updateBandList(bands: Band[]){
        this.paginatedBand.content = bands
    }
    updatePaginatedBand( paginatedBand : PaginatedBand){
        this.paginatedBand = paginatedBand
    }
    get getPaginatedBands(){
        return this.paginatedBand
    }


    async getRequestBand(locality : string, pageNum : number, elementSize: number){
        const response = await fetch(`http://${this.serverIp}:8080/bandos?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`,{
            method: 'GET',
          }) 
        const band = await response.json()
        //console.log
        console.log(band)
        this.updatePaginatedBand(band)
    }
    async deleteBand( username : string, title: string){
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/bando?username=${username}&title=${title}`,{
            method: 'DELETE',
            headers:{
                'Access-Control-Allow-Origin':'*',
            }
        })
        const newPaginatedBands = this.paginatedBand.content!!.filter((item)=>item.title !==title)
        this.updateBandList(newPaginatedBands)
    }
 
}
export default BandStore