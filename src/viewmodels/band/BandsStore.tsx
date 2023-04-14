
import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Band, BandList, PaginatedBand } from "../../models/section/Section";
import { urlBase } from "../../utils/global";
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
    modalCreate: boolean = false
    modalEdit: boolean = false

    constructor() {
        makeObservable(this, {
            paginatedBand: observable,
            band: observable,
            modalEdit: observable,
            modalCreate: observable,
            updateBand: action,
            getBand: computed,
            addRequestBand: action,
            getPaginatedBandrequest: action,
            setModalCreate: action,
            setModalEdit: action,
            deleteBand: action,
            updateBandList: action,
            updatePaginatedBand: action,
            updateAllBandList: action,
            getPaginatedBands: computed,
            getAllBands: computed,
            getModalEdit: computed,
            getModalCreate: computed


        })
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

    async editBand(locality: string, bandId: string, band: Band, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, "bando", "bando", file!!)
            band.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/update/bando?username=${locality}&bandoId=${bandId}`, {
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
            setTimeout(function(){
                window.location.reload();
             }, 1500);
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
    async getPaginatedBandrequest(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/bandos/paginated?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const band = await response.json()
        this.updatePaginatedBand(band)
    }
    async getAllBandRequest(locality: string) {
             const response = await fetch(`${urlBase}/bandos?username=${locality}`, {
            method: 'GET',

        })
        const band = await response.json()
        this.updateAllBandList(band)
    }

    async deleteBand(username: string, idBando: string) {
        const response = await fetch(`${urlBase}/users/delete/bando?username=${username}&idBando=${idBando}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        if (response.ok) {
            const newPaginatedBands = this.paginatedBand.content!!.filter((item) => item.idBando !== idBando)
            this.updateBandList(newPaginatedBands)
            this.updateBand({})
            toast.success('Se ha borrado exitosamente', {
                position: 'bottom-center',
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
    async addRequestBand(username: string, bando: Band, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'bando', 'bando', file!!)
            bando.imageUrl = imageStore.getImage.link
        }
        
        const response = await fetch(`${urlBase}/users/add/bando?username=${username}`, {
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
            setTimeout(function(){
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
}
export default BandStore