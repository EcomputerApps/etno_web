
import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Band, BandList, PaginatedBand } from "../../models/section/Section";
import ImageStore from "../image/ImageStore";

const imageStore = ImageStore.getImageStore()

class BandStore {
    serverIp: string = "192.168.241.51"
    static bandStore: BandStore

    static getBandStore() {
        if (this.bandStore === undefined) {
            this.bandStore = new BandStore()
        }
        return this.bandStore
    }
    //Observables =>
    paginatedBand: PaginatedBand = {}
    allBandList: BandList = {}
    band: Band = {}
    modal: boolean = false
    
    constructor() {
        makeObservable(this, {
            paginatedBand: observable,
            band: observable,
            modal: observable,
            updateBand: action,
            getBand: computed,
            addRequestBand: action,
            getRequestBand: action,
            setModal: action,
             deleteBand: action,
            updateBandList: action,
            updatePaginatedBand: action,
            updateAllBandList: action,
            getPaginatedBands: computed,
            getAllBands: computed,
            getModal : computed,
      
         
        })
    }
    setModal(mode: boolean) {
        this.modal = mode
    }
    get getModal() {
        return this.modal
    }
       updateBandList(bands: Band[]) {
        this.paginatedBand.content = bands
    }
    updateAllBandList(bands: Band[]) {
        this.allBandList.bandos = bands
    }
    updatePaginatedBand(paginatedBand: PaginatedBand) {
        this.paginatedBand = paginatedBand
    }
    get getPaginatedBands() {
        return this.paginatedBand
    }
    get getAllBands() {
        return this.allBandList
    }
    updateBand(band: Band) {
        this.band = band
    }
    get getBand() {
        return this.band
    }

    async editBand(locality: string, bandId: string, band: Band, file: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI("Bolea", "bando", "bando", file!!)
            band.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`http://${this.serverIp}:8080/users/update/bando?username=${locality}&bandoId=${bandId}`, {
            method: 'PUT',
            body: JSON.stringify(band),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
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
                theme: "light"
            })
        } else {
            toast.error('No se ha actualizado', {
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
    async getRequestBand(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/bandos?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const band = await response.json()
        this.updatePaginatedBand(band)
    }
    async getAllBandRequest(locality: string) {
        console.log("here")
        const response = await fetch(`http://${this.serverIp}:8080/bandos?username=${locality}`, {
            method: 'GET',

        })

        const band = await response.json()
        this.updateAllBandList(band)
    }
    async deleteBand(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/bando?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        if (response.ok) {
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
        } else {
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

}
export default BandStore