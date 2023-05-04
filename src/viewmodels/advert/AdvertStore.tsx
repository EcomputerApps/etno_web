import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Ad, AdList, PaginatedAdvert } from "../../models/section/Section";
import { urlBase } from "../../utils/global";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class AdvertStore {
    serverIp: string = `${urlBase}`
    static advertStore: AdvertStore

    static getAdvertStore() {
        if (this.advertStore === undefined) {
            this.advertStore = new AdvertStore()
        }
        return this.advertStore
    }

    //Observables =>
    paginatedAdvert: PaginatedAdvert = {}
    allAdverts: AdList ={}
    isSuccess: boolean = false
    advert: Ad = {}
    modalCreate: boolean = false
    modalEdit: boolean = false
    adsListChecked: Ad[] = []

    constructor() {
        makeObservable(this, {
            allAdverts: observable,
            modalEdit: observable,
            modalCreate: observable,
            setModalCreate: action,
            getModalEdit: computed,
            getModalCreate: computed,
            setModalEdit: action,
            paginatedAdvert: observable,
            advert: observable,
            isSuccess: observable,
            updateIsSuccess: action,
            updatePaginatedAdverts: action,
            updateAdvert: action,
            updateAdvertList: action,
            deleteAdvert: action,
            getPaginatedAdvertRequest: action,
            editAdvert: action,
            addRequestAdvert: action,
            getPaginatedAdverts: computed,
            getAdvert: computed,
            updateAllAdverts: action,
            getAllAdverts: computed,
            adsListChecked: observable

        })
    }
    updateAllAdverts(adverts: Ad[]){
        this.allAdverts.adverts = adverts
    }
    get getAllAdverts(){
        return this.allAdverts
    }
    setModalEdit(mode: boolean) {
        this.modalEdit = mode
    }
    get getModalEdit() {
        return this.modalEdit
    }
    setModalCreate(mode: boolean) {
        this.modalCreate = mode
    }
    get getModalCreate() {
        return this.modalCreate
    }
    get getAdsCheckedList(){
        return this.adsListChecked
    }
    updatePaginatedAdverts(paginatedAdverts: PaginatedAdvert) {
        this.paginatedAdvert = paginatedAdverts
    }
    updateAdvertList(adverts: Ad[]) {
        this.paginatedAdvert.content = adverts
    }
    updateIsSuccess(isSuccess: boolean) {
        this.isSuccess = isSuccess
    }
    updateAdvert(advert: Ad) {
        this.advert = advert
    }

    get getPaginatedAdverts() {
        return this.paginatedAdvert
    }
    get getAdvert() {
        return this.advert
    }

    async addRequestAdvert(locality: string, ad: Ad, file?: File) {
        if(file !== undefined){
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'anuncio', 'anuncio', file!!)
        ad.imageUrl = imageStore.getImage.link
        }
        
        const response = await fetch(`${urlBase}/users/add/ad?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(ad),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (response.ok) {
            this.paginatedAdvert.content?.push(ad)
            this.advert = ad
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        } else {
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

    async editAdvert(locality: string, advertId: string, advert: Ad, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'anuncio', 'anuncio', file!!)
            advert.imageUrl =  imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/update/ad?username=${locality}&adId=${advertId}`, {
            method: 'PUT',
            body: JSON.stringify(advert),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        if (response.ok) {
            toast.success('Se ha actualizado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        } else {
            toast.error('No se ha actualizado', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
        }
    }

    async getPaginatedAdvertRequest(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/ads/paginated?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const adverts = await response.json()
        this.updatePaginatedAdverts(adverts)
    }

    async getAllAdvertRequest(locality: string) {
        const response = await fetch(`${urlBase}/ads?username=${locality}`, {
            method: 'GET'
        })
        const adverts = await response.json()
        this.updateAllAdverts(adverts)
    }


    async deleteAllById(locality: string) {
        const response = await fetch(`${urlBase}/ads/delete/some?username=${locality}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.adsListChecked)
        })
        if(response.ok){
            toast.success('Se han borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
          setTimeout(function(){
            window.location.reload();
         }, 1500);
        }else{
            toast.error('No se ha podido borrar', {
                position: 'bottom-center',
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
    
    async deleteAdvert(username: string, idAdvert: string) {
        const response = await fetch(`${urlBase}/users/delete/ad?username=${username}&idAd=${idAdvert}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })

        if (response.ok) {
            const paginatedAdverts = this.paginatedAdvert.content!!.filter((item) => item.idAd !== idAdvert)
            this.updateAdvertList(paginatedAdverts)
            this.updateAdvert({})
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
        } else {
            toast.error('No se ha podido borrar', {
                position: 'bottom-center',
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
}
export default AdvertStore