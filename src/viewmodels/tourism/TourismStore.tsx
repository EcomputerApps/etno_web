import { makeObservable, action, computed, observable } from "mobx";
import { Tourism , PaginatedTourism} from "../../models/section/Section";

class TourismStore{
    serverIp : string = "192.168.241.51"
    static tourismStore: TourismStore

    static getTourismStore(){
        if(this.tourismStore === undefined){
            this.tourismStore = new TourismStore()
        }
        return this.tourismStore
    }

    //Observables =>
    paginatedTourism : PaginatedTourism = {}
    

    constructor(){
        makeObservable(this, {
            paginatedTourism: observable,
            getRequestTourism: action,
            deleteTourism: action,
            updateTourismList: action,
            updatePaginatedTourism: action,
            getPaginatedTourism : computed
           
        })
    }
    updateTourismList(tourism: Tourism[]){
        this.paginatedTourism.content = tourism
    }
     updatePaginatedTourism( paginatedTourism : PaginatedTourism){
        this.paginatedTourism = paginatedTourism
    }
    get getPaginatedTourism(){
        return this.paginatedTourism
    }
    async getRequestTourism(locality: string, pageNum: number, elementSize: number){
        const response = await fetch(`http://${this.serverIp}:8080/tourism/paginated?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
        method: 'GET',
   
    })
    const tourism = await response.json()
    //console.log
    console.log(tourism)
    this.updatePaginatedTourism(tourism)
    }
    async deleteTourism(username: string, title: string){
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/tourism?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newPaginatedTourism = this.paginatedTourism.content!!.filter((item) => item.title !== title)
            this.updateTourismList(newPaginatedTourism)
    }
    
    

    
}
export default TourismStore