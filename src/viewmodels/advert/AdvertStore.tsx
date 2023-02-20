import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Advert, PaginatedAdvert } from "../../models/section/Section";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class AdvertStore {
    serverIp : string = "192.168.241.51"
    static advertStore: AdvertStore

    static getAdvertStore() {
        if (this.advertStore === undefined) {
            this.advertStore = new AdvertStore()
        }
        return this.advertStore
    }

    //Observables =>
    paginatedAdvert: PaginatedAdvert = {}
    isSuccess: boolean = false
    advert: Advert = {}

    constructor() {
        makeObservable(this, {
            paginatedAdvert: observable,
            advert: observable,
            isSuccess: observable,
            updateIsSuccess: action,
            updatePaginatedAdverts: action,
            updateAdvert: action,
            updateAdvertList: action,
            deleteAdvert: action,
            getRequestAdvert: action,
            addRequestAdvert: action,
            getPaginatedAdverts: computed,
            getAdvert: computed
        })
    }
    updatePaginatedAdverts(paginatedAdverts: PaginatedAdvert) {
        this.paginatedAdvert = paginatedAdverts
    }
    updateAdvertList(adverts: Advert[]) {
        this.paginatedAdvert.content = adverts
    }
    updateIsSuccess(isSuccess: boolean){
        this.isSuccess = isSuccess
    }
    updateAdvert(advert: Advert){
        this.advert = advert
    }
    
    get getPaginatedAdverts() {
        return this.paginatedAdvert
    }
    get getAdvert(){
        return this.advert
    }

    async addRequestAdvert(locality: string, ad: Advert, file: File){
        await imageStore.addImageAPI('Bolea', 'anuncio', 'anuncio', file!!)

        this.advert.imageUrl = imageStore.getImage.link

        const response = await fetch(`http://${this.serverIp}:8080/users/add/ad?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(ad),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if(response.ok){
            this.paginatedAdvert.content?.push(ad)
            this.advert = ad
            toast.success('Se ha añadido exitosamente', {
                position: 'top-center',
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
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }
    }

    async getRequestAdvert(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/ads?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const adverts = await response.json()
        this.updatePaginatedAdverts(adverts)
    }

    async deleteAdvert(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/ad?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })

        if(response.ok){
            const paginatedAdverts = this.paginatedAdvert.content!!.filter((item) => item.title !== title)
            this.updateAdvertList(paginatedAdverts)
            this.updateAdvert({})
            toast.success('Se ha borrado exitosamente', {
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
            toast.error('No se ha podido borrar', {
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
export default AdvertStore