import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Pharmacy, PaginatedPharmacy, PharmacyOnDuty } from "../../models/section/Section";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class PharmacyStore {
    serverIp : string = "192.168.241.51"
    static pharmacyStore: PharmacyStore

    static getPharmacyStore() {
        if (this.pharmacyStore === undefined) {
            this.pharmacyStore = new PharmacyStore()
        }
        return this.pharmacyStore
    }

    //Observables =>
    paginatedPharmacy: PaginatedPharmacy = {}
    pharmacy: Pharmacy = {}
    pharmacyOnDutyList: PharmacyOnDuty = {}
  


    constructor() {
        makeObservable(this, {
            paginatedPharmacy: observable,
            pharmacyOnDutyList: observable,
             updatePOD: action,
            pharmacy: observable,
            updatePharmacy: action,
            getPharmacy: computed,
            getRequestPharmacy: action,
            addRequestPharmacy: action,
            deletePharmacy: action,
            updatePaginatedPharmacy: action,
            updatePharmacyList: action,
            getPaginatedPharmacy: computed,
            getPOD: computed

        })
    }
    updatePOD(pharmacys: Pharmacy[]) {
        this.pharmacyOnDutyList.content = pharmacys
    }
    get getPOD() {
        return this.pharmacyOnDutyList
    }

    updatePharmacyList(pharmacys: Pharmacy[]) {
        this.paginatedPharmacy.content = pharmacys
    }
    updatePaginatedPharmacy(paginatedPharmacy: PaginatedPharmacy) {
        this.paginatedPharmacy = paginatedPharmacy
    }
    get getPaginatedPharmacy() {
        return this.paginatedPharmacy
    }
    updatePharmacy(pharmacy: Pharmacy) {
        this.pharmacy = pharmacy

    } get getPharmacy() {
        return this.pharmacy
    }

    async editPharm(locality: string, pharmId: string, pharm: Pharmacy, file: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI("Bolea", "farmacia", "farmacia", file!!)
            pharm.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`http://${this.serverIp}:8080/users/update/pharmacy?username=${locality}&pharmacyId=${pharmId}`, {
            method: 'PUT',
            body: JSON.stringify(pharm),
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

    async getRequestPharmacy(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/pharmacies?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const pharmacy = await response.json()
        this.updatePaginatedPharmacy(pharmacy)
    }
    async getRequestPharmacyOnDuty(locality: string) {
        const response = await fetch(`http://${this.serverIp}:8080/pharmacies?username=${locality}`, {
            method: 'GET'
        })
        const pharmacy = await response.json()
        this.updatePOD(pharmacy)
    }
    
    async deletePharmacy(username: string, name: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/pharmacy?username=${username}&name=${name}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newPaginedPharmacy = this.paginatedPharmacy.content!!.filter((item) => item.name !== name)
            this.updatePharmacyList(newPaginedPharmacy)
            this.updatePOD(newPaginedPharmacy)
            this.updatePharmacy({})
            toast.success('Se ha borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 1000,
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
    async addRequestPharmacy(username: string, pharmacy: Pharmacy, file: File) {
        await imageStore.addImageAPI('Bolea', 'farmacia', 'farmacia', file)
        pharmacy.imageUrl = imageStore.getImage.link
        const response = await fetch(`http://${this.serverIp}:8080/users/add/pharmacy?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(pharmacy)
        })
        if (response.ok) {
            this.paginatedPharmacy.content?.push(pharmacy)
            this.pharmacyOnDutyList.content?.push(pharmacy)
            this.pharmacy = pharmacy
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

export default PharmacyStore