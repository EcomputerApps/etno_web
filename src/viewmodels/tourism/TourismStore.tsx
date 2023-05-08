import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Tourism, PaginatedTourism, TourismType, TourismList } from "../../models/section/Section";
import { urlBase } from "../../utils/global";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class TourismStore {
    serverIp: string = "192.168.241.51"
    static tourismStore: TourismStore

    static getTourismStore() {
        if (this.tourismStore === undefined) {
            this.tourismStore = new TourismStore()
        }
        return this.tourismStore
    }

    tourismTypes: Array<TourismType> = [
        {
        "id": 'checkOne',
        "value": 'General',
        "title": 'General'
        },
        {
        "id": "checkTwo",
        "value": "Restaurante",
        "title": "Restaurante",
    }, {
        "id": "checkThree",
        "value": "Museo",
        "title": "Museo",
    }, {
        "id": "checkFour",
        "value": "Hotel",
        "title": "Hotel",
    }]

    //Observables =>
    paginatedTourism: PaginatedTourism = {}
    allTourism: TourismList = {}
    tourism: Tourism = {}
    modalCreate: boolean = false
    modalEdit: boolean = false
    tourismListChecked: Tourism[] = []

    constructor() {
        makeObservable(this, {
            allTourism: observable,
            tourismTypes: observable,
            modalEdit: observable,
            modalCreate: observable,
            tourismListChecked: observable,
            setModalCreate: action,
            getModalEdit: computed,
            getModalCreate: computed,
            paginatedTourism: observable,
            tourism: observable,
            addRequestTourism: action,
            getAllTourismRequest: action,
            getPaginatedTourismRequest:action,
            deleteTourism: action,
            updateTourismList: action,
            updatePaginatedTourism: action,
            updateTourism: action,
            getPaginatedTourism: computed,
            getTourism: computed,
            updateTourismTypes: action,
            getTourismTypes: computed,
            updateAllTourism: action,
            deleteAllById: action,
            getAllTourism: computed

        })
    }
    updateAllTourism(tourism: Tourism[]) {
        this.allTourism.tourism = tourism
    }
    get getAllTourism() {
        return this.allTourism
    }
    updateTourismTypes(tourismType: TourismType[]) {
        this.tourismTypes = tourismType
    }
    get getTourismTypes() {
        return this.tourismTypes
    }
    get getTourismCheckedList(){
        return this.tourismListChecked
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

    updateTourismList(tourism: Tourism[]) {
        this.paginatedTourism.content = tourism
    }

    updatePaginatedTourism(paginatedTourism: PaginatedTourism) {
        this.paginatedTourism = paginatedTourism
    }

    updateTourism(tourism: Tourism) {
        this.tourism = tourism
    }

    get getPaginatedTourism() {
        return this.paginatedTourism
    }
    get getTourism() {
        return this.tourism
    }

    async addRequestTourism(locality: string, tourism: Tourism, file?: File) {

        if(file !== undefined){
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'turismo', 'turismo', file!!)
        tourism.imageUrl = imageStore.getImage.link
        }
        
        const response = await fetch(`${urlBase}/users/add/tourism?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(tourism),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (response.ok) {
            this.paginatedTourism.content?.push(tourism)
            this.tourism = tourism
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 100,
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
            toast.error('No se ha podido añadir exitosamente', {
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

    async editTourism(locality: string, tourismId: string, tourism: Tourism, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'turismo', 'turismo', file!!)
            tourism.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/update/tourism?username=${locality}&tourismId=${tourismId}`, {
            method: 'PUT',
            body: JSON.stringify(tourism),
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

    async getPaginatedTourismRequest(locality: string, title: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/tourism/paginated/?username=${locality}&title=${title}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const tourism = await response.json()
        this.updatePaginatedTourism(tourism)
    }

    async getAllTourismRequest(locality: string) {
        const response = await fetch(`${urlBase}/tourism?username=${locality}`, {
            method: 'GET',
        })
        const tourism = await response.json()
        this.updateAllTourism(tourism)
    }

    async deleteTourism(username: string, idTourism: string) {
        const response = await fetch(`${urlBase}/users/delete/tourism?username=${username}&idTourism=${idTourism}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })

        if (response.ok) {
            const newPaginatedTourism = this.paginatedTourism.content!!.filter((item) => item.idTourism !== idTourism)
            this.updateTourismList(newPaginatedTourism)
            this.updateTourism({})
            toast.success('Se ha eliminado exitosamente', {
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
            toast.success('No se ha podido eliminar exitosamente', {
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
        const response = await fetch(`${urlBase}/tourism/delete/some?username=${locality}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.tourismListChecked)
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
export default TourismStore