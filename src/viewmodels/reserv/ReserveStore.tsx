import { action, computed, makeObservable, observable } from "mobx"
import { toast } from "react-toastify"
import { Hall, HallList, PaginatedPlace, PaginatedReserve, Place, PlaceList, Reserve, ReserveUser, ReserveList } from "../../models/section/Section"
import { urlBase } from "../../utils/global";
import ImageStore from "../image/ImageStore";

const imageStore = ImageStore.getImageStore()
class ReserveStore {
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
    placeListChecked: Place[] = []
    reserveListChecked: Reserve[] = []
    allReserves: ReserveList = {}
    placeList: PlaceList = {}
    paginatedReserve: PaginatedReserve = {}
    paginatedPlace: PaginatedPlace = {}
    hallList: HallList = {}
    reserveUser: ReserveUser = {}

    constructor() {
        makeObservable(this, {
            allReserves: observable,
            modalClientInfo: observable,
            reserveUser: observable,
            modalEdit: observable,
            modalCreate: observable,
            modalCalendar: observable,
            modalPlaces: observable,
            placeListChecked: observable,
            reserveListChecked: observable,
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
            savePlaceList: action,
            saveReserveList: action,
            updateReserve: action,
            udpateAllReserves: action,
            updatePaginatedReserve: action,
            updatePaginatedPlaces: action,
            updateHallList: action,
            updateAllPlaces: action,
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
            getAllPlaces: computed,
            getModalPlaceList: computed,
            getReserveUser: computed,
            getPlacesCheckedList: computed,
            getReservesCheckedList: computed
        })
    }
    setModalEditHalls(mode: boolean) {
        this.modalEditHalls = mode
    }
    get getModalEditHalls() {
        return this.modalEditHalls
    }
    savePlaceList(places: Place[]){
        this.placeListChecked = places
    }
    saveReserveList(reserves: Reserve[]){
        this.reserveListChecked = this.reserveListChecked
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
    updateReserveUser(reserveUser: ReserveUser) {
        this.reserveUser = reserveUser
    }
    get getReserveUser() {
        return this.reserveUser
    }
    get getPlacesCheckedList(){
        return this.placeListChecked
    }
    get getReservesCheckedList(){
        return this.reserveListChecked
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
        const paginatedReserve: PaginatedReserve = {
            content: this.paginatedReserve.content?.slice().sort((b, a) =>
              new Date(a.date!).getTime() - new Date(b.date!).getTime()
            ),
            totalPages: this.paginatedReserve.totalPages,
            totalElements: this.paginatedReserve.totalElements,
            pageNum: this.paginatedReserve.pageNum
          }
        return paginatedReserve
    }
    //-----------------Reserves------------------------//
    //----------------Hall----------------------------//
    updateHallList(halls: Hall[]) {
        this.hallList.content = halls
    }
    get getHallList() {
        return this.hallList.content
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
    updateAllPlaces(places: Place[]) {
        this.placeList.places = places
    }
    get getAllPlaces() {
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
        this.allReserves.reserves = reserve
    }
    get getAllReserves() {
        return this.allReserves
    }
    updateReserve(reserve: Reserve) {
        this.reserve = reserve
    }
    get getReserve() {
        return this.reserve
    }
    //--------------Reserve 4 Calendar-------------//
    //----------------------------------------------------------------------------------------------------------------------------

    async getRequestPlaces(username : string) {
        const response = await fetch(`${urlBase}/places?username=${username}`, {
            method: 'GET',
        })
        const place = await response.json()

        this.updateAllPlaces(place)
    }

    async deletePlace(username: string, idPlace: string) {
        const response = await fetch(`${urlBase}/users/delete/place?username=${username}&idPlace=${idPlace}`, {
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
    async editPlace(locality: string, palceId: string, place: Place, file: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, "lugar", "lugar", file!!)
            place.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/update/place?username=${locality}&placeId=${palceId}`, {
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
    async getPaginatedPlacesRequest(locality: string, title: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/places/paginated?username=${locality}&name=${title}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const pagPlaces = await response.json()
        this.updatePaginatedPlaces(pagPlaces)
    }
    async addRequestPlace(username: string, place: Place, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, "lugar", "lugar", file!!)
            place.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/add/place?username=${username}`,
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
        const response = await fetch(`${urlBase}/halls`, {
            method: 'GET',
        })

        const hall = await response.json()

        this.updateHallList(hall)
    }

    async getAllReserevesRequest(username: string) {
        const response = await fetch(`${urlBase}/reserves?username=${username}`, {
            method: 'GET',
        })
        const reserves = await response.json()

        this.udpateAllReserves(reserves)
    }

    async confirmReserve(username: string, idReserve: string) {
        const response = await fetch(`${urlBase}/users/confirm/reserve?username=${username}&idReserve=${idReserve}`, {
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
        const response = await fetch(`${urlBase}/users/delete/reserve?username=${username}&idReserve=${idReserve}`, {
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

        const response = await fetch(`${urlBase}/users/add/reserve?username=${username}&idHall=${idHall}&idPlace=${idPlace}`,
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
    async getPaginatedReserveRequest(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/reserves/paginated?username=${locality}&name=&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const reserves = await response.json()
        this.updatePaginatedReserve(reserves)
    }

    async deleteAllPlaceById(locality: string) {
        const response = await fetch(`${urlBase}/places/delete/some?username=${locality}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.placeListChecked)
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
    async deleteAllReserveById(locality: string) {
        const response = await fetch(`${urlBase}/reserves/delete/some?username=${locality}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.reserveListChecked)
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
export default ReserveStore