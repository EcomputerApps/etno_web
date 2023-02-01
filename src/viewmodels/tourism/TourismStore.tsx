import { makeObservable, action, computed, observable } from "mobx";
import { Tourism } from "../../models/section/Section";

class TourismStore{
    static tourismStore: TourismStore

    static getTourismStore(){
        if(this.tourismStore === undefined){
            this.tourismStore = new TourismStore()
        }
        return this.tourismStore
    }

    //Observables =>
    tourismList: Tourism[] = []

    constructor(){
        makeObservable(this, {
            tourismList: observable,
            getRequestTourism: action,
            deleteTourism: action,
            updateTourismList: action,
            getTourismList: computed
        })
    }

    async getRequestTourism(localidad: string){
        const response = await fetch(`http://192.168.137.1:8080/tourism?username=${localidad}`, {
        method: 'GET',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    })
    const tourism = await response.json()
    this.updateTourismList(tourism)
    }
    async deleteTourism(locality: string, title: string){
        const response = await fetch(`http://192.168.137.1:8080/users/delete/tourism?username=${locality}&title=${title}`, {
            method: 'DELETE',
            'headers': {
                'Access-Control-Allow-Origin': '*',
            }
        })
        const newList = this.tourismList.filter((item) => item.title !== title)
            this.updateTourismList(newList)
    }
    
    updateTourismList(tourism: Tourism[]){
        this.tourismList = tourism
    }

    get getTourismList(){
        return this.tourismList
    }
}
export default TourismStore