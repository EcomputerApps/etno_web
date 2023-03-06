import { action, computed, makeObservable, observable } from "mobx"
import { toast } from "react-toastify"
import { PaginatedPlace, PaginatedReserv, Reserv, ReservList } from "../../models/section/Section"

class ReserveStore {
    serverIp: string = "192.168.241.51"
    static reserveStore: ReserveStore

    static getReserveStore() {
        if (this.reserveStore === undefined) {
            this.reserveStore = new ReserveStore()
        }
        return this.reserveStore
    }

    modalCreate: boolean = false
    modalEdit: boolean = false
    modalReservList: boolean = false
    modalReservPlaces: boolean = false
    modalReservCreatePlaces: boolean = false

    reser: Reserv = {}
    reservList: ReservList = {}
    paginatedReserv: PaginatedReserv = {}
    paginatedPlace: PaginatedPlace = {}

    constructor() {
        makeObservable(this, {
            modalEdit: observable,
            modalCreate: observable,
            modalReservList: observable,
            modalReservPlaces: observable,
            modalReservCreatePlaces: observable,
            paginatedReserv: observable,
            setModalCreate: action,
            setModalEdit: action,
            setModalReservList: action,
            updateReserv: action,
            updateReservList: action,
            updatePaginatedReserv: action,
            updatePaginatedPlace: action,
            getModalEdit: computed,
            getModalCreate: computed,
            getModalReservList: computed,
            getModalReservCreatePlaces: computed,
            getReserv: computed,
            getReservList: computed,
            getPaginatedReserv: computed,
            getPaginatedPlace: computed
        })
    }
    setModalReservCreatePlaces(mode: boolean) {
        this.modalReservCreatePlaces = mode
    }
    get getModalReservCreatePlaces() {
        return this.modalReservCreatePlaces
    }
    setModalReservPlaces(mode: boolean) {
        this.modalReservPlaces = mode
    }
    get getModalReservPlaces() {
        return this.modalReservPlaces
    }
    setModalReservList(mode: boolean) {
        this.modalReservList = mode
    }
    get getModalReservList() {
        return this.modalReservList
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
    updatePaginatedReserv(paginatedReserv: PaginatedReserv) {
        this.paginatedReserv = paginatedReserv
    }
    get getPaginatedReserv() {
        return this.paginatedReserv
    }
    updatePaginatedPlace(paginatedPlace: PaginatedPlace) {
        this.paginatedPlace = paginatedPlace
    }
    get getPaginatedPlace() {
        return this.paginatedPlace
    }

    updateReservList(reserv: Reserv[]) {
        this.reservList.reservs = reserv
    }
    get getReservList() {
        return this.reservList
    }
    updateReserv(reserv: Reserv) {
        this.reser = reserv
    }
    get getReserv() {
        return this.reser
    }
    //TEMPORAL METHOD
    async addRequestReserv(username: string, reserv: Reserv) {
        const response = await fetch(`http://${this.serverIp}:8080/users/add/reserv?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(reserv)
        })
        if (response.ok) {

            this.reser = reserv
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
    //TEMPORAL METHOD
    async getRequestReservs(locality: string) {
        const response = await fetch(`http://${this.serverIp}:8080/reservs?username=${locality}`, {
            method: 'GET'
        })
        const reservs = await response.json()
        this.updateReservList(reservs)
    }
    //TEMPORAL METHOD
    async getRequestReserv(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/reservs?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const reserv = await response.json()
        this.updatePaginatedReserv(reserv)
    }
    //TEMPORAL METHOD
    async getRequestPlaces(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/places?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const place = await response.json()
        this.updatePaginatedPlace(place)
    }

}
export default ReserveStore