import { action, computed, makeObservable, observable } from "mobx"
import { toast } from "react-toastify"
import { Hall, HallList, PaginatedBand, PaginatedPlace, PaginatedReserve, Place, PlaceList, Reserve, ReserveUser, ReservList } from "../../models/section/Section"
import ImageStore from "../image/ImageStore";

const imageStore = ImageStore.getImageStore()
class ReserveStore {
    serverIp: string = "192.168.241.51"
    static reserveStore: ReserveStore

    static getReserveStore() {
        if (this.reserveStore === undefined) {
            this.reserveStore = new ReserveStore()
        }
        return this.reserveStore
    }
    //Modals
    modalCreate: boolean = false
    modalClientInfo: boolean = false
    modalEdit: boolean = false
    modalCalendar: boolean = false
    modalPlaces: boolean = false
    modalCreatePlaces: boolean = false
    modalAddHalls: boolean = false
    modalEditHalls: boolean = false
    //Modals
    reserve: Reserve = {}
    place: Place = {}
    reserveList: ReservList = {}
    placeList: PlaceList = {}
    paginatedReserve: PaginatedReserve = {}
    paginatedPlace: PaginatedPlace = {}
    hallList: HallList = {}
    reserveUser : ReserveUser = {}

    constructor() {
        makeObservable(this, {
            modalClientInfo: observable,
            reserveUser : observable,
            modalEdit: observable,
            modalCreate: observable,
            modalCalendar: observable,
            modalPlaces: observable,
            modalAddHalls: observable,
            modalCreatePlaces: observable,
            paginatedReserve: observable,
            hallList: observable,
            modalEditHalls: observable,
            paginatedPlace: observable,
            setModalCreate: action,
            setModalClientInfo: action,
            setModalCalendar: action,
            setModalAddHalls: action,
            setModalEdit: action,
            setModalEditHalls: action,
            updatePlace: action,
            updateReserveUser: action,
            updatePaginatedReserveContent: action,
            updatePaginatedPlacesContent: action,
            updateReserve: action,
            udpateAllReserves: action,
            updatePaginatedReserve: action,
            updatePaginatedPlaces: action,
            updateHallList: action,
            updatePlaceList: action,
            getModalClientInfo: computed,
            getModalCreate: computed,
            getModalCalendar: computed,
            getModalCreatePlaces: computed,
            getReserve: computed,
            getAllReserves: computed,
            getPaginatedReserve: computed,
            getPaginatedPlaces: computed,
            getHallList: computed,
            getModalAddHalls: computed,
            getModalEdit: computed,
            getPlace: computed,
            getModalEditHalls: computed,
            getPlaceList : computed,
            getModalPlaceList : computed,
            getReserveUser: computed
           
        })
    }
    setModalEditHalls(mode: boolean) {
        this.modalEditHalls = mode
    }
    get getModalEditHalls() {
        return this.modalEditHalls
    }
    setModalEdit(mode: boolean) {
        this.modalEdit = mode
    }
    get getModalEdit() {
        return this.modalEdit
    }
    setModalAddHalls(mode: boolean) {
        this.modalAddHalls = mode
    }
    get getModalAddHalls() {
        return this.modalAddHalls
    }
    setModalCreatePlaces(mode: boolean) {
        this.modalCreatePlaces = mode
    }
    get getModalCreatePlaces() {
        return this.modalCreatePlaces
    }
    setModalPlaceList(mode: boolean) {
        this.modalPlaces = mode
    }
    get getModalPlaceList() {
        return this.modalPlaces
    }
    setModalCalendar(mode: boolean) {
        this.modalCalendar = mode
    }
    get getModalCalendar() {
        return this.modalCalendar
    }
    setModalClientInfo(mode: boolean) {
        this.modalClientInfo = mode
    }
    get getModalClientInfo() {
        return this.modalClientInfo
    }
    setModalCreate(mode: boolean) {
        this.modalCreate = mode
    }
    get getModalCreate() {
        return this.modalCreate
    }
    updateReserveUser( reserveUser: ReserveUser){
        this.reserveUser = reserveUser
    }
    get getReserveUser(){
        return this.reserveUser
    }
    //----------------------------------------------------------------------------
    //------------Reserves---------------------------//
    updatePaginatedReserveContent(reserve: Reserve[]) {
        this.paginatedReserve.content = reserve
    }
    updatePaginatedReserve(reserve: PaginatedReserve) {
        this.paginatedReserve = reserve
    }
    get getPaginatedReserve() {
        return this.paginatedReserve
    }
    //-----------------Reserves------------------------//
    //----------------Hall----------------------------//
    updateHallList(halls: Hall[]) {
        this.hallList.content = halls
    }
    get getHallList() {
        return this.hallList
    }
    //--------------Hall---------------------------//
    //--------------Place--------------------------//
    updatePaginatedPlacesContent(places: Place[]) {
        this.paginatedPlace.content = places
    }
    updatePaginatedPlaces(places: PaginatedPlace) {
        this.paginatedPlace = places
    }
    get getPaginatedPlaces() {
        return this.paginatedPlace
    }
    updatePlaceList(places: Place[]) {
        this.placeList.places = places
    }
    get getPlaceList() {
        return this.placeList
    }
    updatePlace(place: Place) {
        this.place = place
    }
    get getPlace() {
        return this.place
    }
    //--------------Place---------------------------//
    //--------------Reserve 4 Calendar-------------//
    udpateAllReserves(reserve: Reserve[]) {
        this.reserveList.reserves = reserve
    }
    get getAllReserves() {
        return this.reserveList
    }
    updateReserve(reserve: Reserve) {
        this.reserve = reserve
    }
    get getReserve() {
        return this.reserve
    }
    //--------------Reserve 4 Calendar-------------//
    //----------------------------------------------------------------------------------------------------------------------------

    async getRequestPlaces() {
        const response = await fetch(`http://${this.serverIp}:8080/places`, {
            method: 'GET',
        })
        const place = await response.json()

        this.updatePlaceList(place)
    }
    async deletePlace(username: string, idPlace: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/place?username=${username}&idPlace=${idPlace}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        if (response.ok) {
            const newPaginatedPlace = this.paginatedPlace.content!!.filter((item) => item.idPlace !== idPlace)
            this.updatePaginatedPlacesContent(newPaginatedPlace)
            this.updatePlace({})
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
    async editPlace(locality: string, palceId: string, place: Place, file: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI("Bolea", "lugar", "lugar", file!!)
            place.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`http://${this.serverIp}:8080/users/update/place?username=${locality}&placeId=${palceId}`, {
            method: 'PUT',
            body: JSON.stringify(place),
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
            setTimeout(function () {
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
    async getRequestPagiantedPlaces(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/places?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const pagPlaces = await response.json()
        this.updatePaginatedPlaces(pagPlaces)
    }
    async addRequestPlace(username: string, place: Place, file: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI("Bolea", "lugar", "lugar", file!!)
            place.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`http://${this.serverIp}:8080/users/add/place?username=${username}`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Access-Control-Allow-Origin': '*'

                },
                body: JSON.stringify(place)
            })
        if (response.ok) {
            this.place = place
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
    //TEMPORAL METHOD++
    async getRequestHalls() {
        const response = await fetch(`http://${this.serverIp}:8080/halls`, {
            method: 'GET',
        })

        const hall = await response.json()

        this.updateHallList(hall)
    }
    //TEMPORAL METHOD++
    async getRequestReserves() {
        const response = await fetch(`http://${this.serverIp}:8080/reserves`, {
            method: 'GET',
        })
        const reserves = await response.json()

        this.udpateAllReserves(reserves)
    }
    async confirmReserve(username: string, idReserve: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/confirm/reserve?username=${username}&idReserve=${idReserve}`, {
            method: 'PUT',
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
            setTimeout(function () {
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
    async deleteReserve(username: string, idReserve: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/reserve?username=${username}&idReserve=${idReserve}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newPagiantedReserve = this.paginatedReserve.content!!.filter((item) => item.idReserve !== idReserve)
            this.updatePaginatedReserveContent(newPagiantedReserve)
            this.udpateAllReserves(newPagiantedReserve)
            this.updateReserve({})
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
            setTimeout(function () {
                window.location.reload();
            }, 500);
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
    async addRequestReserve(username: string, reserve: Reserve, idHall: string, idPlace: string) {

        const response = await fetch(`http://${this.serverIp}:8080/users/add/reserve?username=${username}&idHall=${idHall}&idPlace=${idPlace}`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Access-Control-Allow-Origin': '*'

                },
                body: JSON.stringify(reserve)
            })
        if (response.ok) {
            this.reserve = reserve
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
    async getRequestPagiantedReserves(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/reserves?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const reserves = await response.json()
        this.updatePaginatedReserve(reserves)
    }
}
export default ReserveStore