import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Tourism , PaginatedTourism} from "../../models/section/Section";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

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
    tourism: Tourism = {}
    
    constructor(){
        makeObservable(this, {
            paginatedTourism: observable,
            tourism: observable,
            addRequestTourism: action,
            getRequestTourism: action,
            deleteTourism: action,
            updateTourismList: action,
            updatePaginatedTourism: action,
            updateTourism: action,
            getPaginatedTourism : computed,
            getTourism: computed
        })
    }
    updateTourismList(tourism: Tourism[]){
        this.paginatedTourism.content = tourism
    }

     updatePaginatedTourism( paginatedTourism : PaginatedTourism){
        this.paginatedTourism = paginatedTourism
    }

    updateTourism(tourism: Tourism) {
        this.tourism = tourism
    }

    get getPaginatedTourism(){
        return this.paginatedTourism
    }
    get getTourism(){
        return this.tourism
    }

    async addRequestTourism(locality: string, tourism: Tourism, file: File){
        await imageStore.addImageAPI('Bolea', 'turismo', 'turismo', file!!)

        tourism.imageUrl = imageStore.getImage.link
        
        const response = await fetch(`http://${this.serverIp}:8080/users/add/tourism?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(tourism),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if(response.ok){
            this.paginatedTourism.content?.push(tourism)
            this.tourism = tourism
            toast.success('Se ha añadido exitosamente', {
                position: 'top-center',
                autoClose: 100,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }else{
            toast.error('No se ha podido añadir exitosamente', {
                position: 'top-center',
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
            this.updateTourism({})
            toast.success('Se ha eliminado exitosamente', {
                position: 'top-center',
                autoClose: 100,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }else{
            toast.success('No se ha podido eliminar exitosamente', {
                position: 'top-center',
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