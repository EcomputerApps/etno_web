
import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Band, PaginatedBand } from "../../models/section/Section";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class BandStore {
    serverIp: string = "192.168.137.1"
    static bandStore: BandStore

    static getBandStore() {
        if (this.bandStore === undefined) {
            this.bandStore = new BandStore()
        }
        return this.bandStore
    }
    //Observables =>
    paginatedBand: PaginatedBand = {}
    band : Band = {}

    constructor() {
        makeObservable(this, {
            paginatedBand: observable,
            band : observable,
            updateBand : action,
            getBand : computed,
            addRequestBand: action,
            getRequestBand: action,
            deleteBand: action,
            updateBandList: action,
            updatePaginatedBand: action,
            getPaginatedBands: computed
        })
    }

    updateBandList(bands: Band[]) {
        this.paginatedBand.content = bands
    }
    updatePaginatedBand(paginatedBand: PaginatedBand) {
        this.paginatedBand = paginatedBand
    }
    get getPaginatedBands() {
        return this.paginatedBand
    }
    updateBand(band : Band){
        this.band = band
    }
    get getBand(){
        return this.band
    }

    async getRequestBand(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/bandos?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const band = await response.json()
        this.updatePaginatedBand(band)
    }
    async deleteBand(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/bando?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        if(response.ok){
        const newPaginatedBands = this.paginatedBand.content!!.filter((item) => item.title !== title)
        this.updateBandList(newPaginatedBands)
        this.updateBand({})
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
    async addRequestBand(username: string, bando: Band, file: File) {
        await imageStore.addImageAPI('Bolea', 'bando', 'bando', file)
        bando.imageUrl = imageStore.getImage.link
        const response = await fetch(`http://${this.serverIp}:8080/users/add/bando?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(bando)
        })
        if (response.ok) {
            this.paginatedBand.content?.push(bando)
            this.band = bando
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

}
export default BandStore