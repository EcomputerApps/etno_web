import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
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
            addRequestTourism: action,
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

    async addRequestTourism(locality: string, tourism: Tourism){
        const response = await fetch(`http://${this.serverIp}:8080/users/add/tourism?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(tourism),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if(response.ok){
            this.paginatedTourism.content?.push(tourism)
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }else{
            toast.error('No se ha añadido correctamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
    }
}

    async getRequestTourism(locality: string, pageNum: number, elementSize: number){
        const response = await fetch(`http://${this.serverIp}:8080/tourism/?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
        method: 'GET',
    })
    const tourism = await response.json()
    this.updatePaginatedTourism(tourism)
    }

    async deleteTourism(username: string, title: string){
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/tourism?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if(response.ok){
        const newPaginatedTourism = this.paginatedTourism.content!!.filter((item) => item.title !== title)
            this.updateTourismList(newPaginatedTourism)
            toast.success('Se ha borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }else{
            toast.error('No se ha podido borrar', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }
    }    
}
export default TourismStore