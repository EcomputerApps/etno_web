import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Pharmacy, PaginatedPharmacy, PharmacyOnDuty } from "../../models/section/Section";
import { urlBase } from "../../utils/global";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class PharmacyStore {
    serverIp: string = "192.168.241.51"
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
    selector: number = 0
    modalCreate: boolean = false
    modalEdit: boolean = false
    modalCalendar: boolean = false
    pharmaciesListChecked: Pharmacy[] = []


    constructor() {
        makeObservable(this, {
            modalEdit: observable,
            modalCreate: observable,
            modalCalendar: observable,
            selector: observable,
            setModalCreate: action,
            getModalEdit: computed,
            setModalCalendar: action,
            getModalCreate: computed,
            paginatedPharmacy: observable,
            pharmacyOnDutyList: observable,
            updatePOD: action,
            pharmacy: observable,
            updatePharmacy: action,
            getPharmacy: computed,
            getPaginatedPharmacyrequest: action,
            getRequestPharmacyOnDuty:action,
            addRequestPharmacy: action,
            deletePharmacy: action,
            updatePaginatedPharmacy: action,
            updatePharmacyList: action,
            setSelector: action,
            getPaginatedPharmacy: computed,
            getPOD: computed,
            getModalCalendar: computed,
            getSelector: computed,
            getPharmaciesCheckedList: computed,
            pharmaciesListChecked: observable
        })
    }
    setSelector(position: number) {
        this.selector = position
    }
    get getSelector() {
        return this.selector
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
    get getModalCalendar() {
        return this.modalCalendar
    }
    setModalCalendar(mode: boolean) {
        this.modalCalendar = mode
    }
    get getModalCreate() {
        return this.modalCreate
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

get getPharmaciesCheckedList(){
        return this.pharmaciesListChecked
    }

    async getPaginatedPharmacyrequest(locality: string, title: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/pharmacies/paginated?username=${locality}&name=${title}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const pharmacy = await response.json()
        this.updatePaginatedPharmacy(pharmacy)
    }
    async getRequestPharmacyOnDuty(locality: string) {
        const response = await fetch(`${urlBase}/pharmacies?username=${locality}`, {
            method: 'GET'
        })
        const pharmacy = await response.json()
        this.updatePOD(pharmacy)
    }

    async deletePharmacy(username: string, idPharmacy: string) {
        const response = await fetch(`${urlBase}/users/delete/pharmacy?username=${username}&idPharmacy=${idPharmacy}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newPaginedPharmacy = this.paginatedPharmacy.content!!.filter((item) => item.idPharmacy !== idPharmacy)
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

    async editPharmacy(locality?: string, pharmacyId?: string, pharmacy?: Pharmacy, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'farmacia', 'farmacia', file!!)
            pharmacy!!.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/update/pharmacy?username=${locality}&pharmacyId=${pharmacyId}`, {
            method: 'PUT',
            body: JSON.stringify(pharmacy),
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
            }, 1500);
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

    async addRequestPharmacy(username?: string, pharmacy?: Pharmacy, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'farmacia', 'farmacia', file!!)
            pharmacy!!.imageUrl = imageStore.getImage.link
        }
        
        const response = await fetch(`${urlBase}/users/add/pharmacy?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(pharmacy)
        })
        if (response.ok) {
            this.paginatedPharmacy.content?.push(pharmacy!!)
            this.pharmacyOnDutyList.content?.push(pharmacy!!)
            this.pharmacy = pharmacy!!
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
    async deleteAllById(locality: string) {
        const response = await fetch(`${urlBase}/pharmacies/delete/some?username=${locality}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.pharmaciesListChecked)
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
}

export default PharmacyStore