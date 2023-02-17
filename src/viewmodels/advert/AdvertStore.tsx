import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Advert, PaginatedAdvert } from "../../models/section/Section";

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

    constructor() {
        makeObservable(this, {
            paginatedAdvert: observable,
            isSuccess: observable,
            updateIsSuccess: action,
            updatePaginatedAdverts: action,
            updateAdvertList: action,
            deleteAdvert: action,
            getRequestAdvert: action,
            addRequestAdvert: action,
            getPaginatedAdverts: computed
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
    get getPaginatedAdverts() {
        return this.paginatedAdvert
    }

    async addRequestAdvert(locality: string, ad: Advert){
        const response = await fetch(`http://${this.serverIp}:8080/users/add/ad?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(ad),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if(response.ok){
            this.paginatedAdvert.content?.push(ad)
            toast.success('Se ha añadido exitosamente', {
                position: 'top-center',
                autoClose: 1000,
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
            toast.success('Se ha borrado exitosamente', {
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