import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Necrologue, NecrologueList, PaginatedNecro } from "../../models/section/Section";
import { urlBase } from "../../utils/global";
import ImageStore from "../image/ImageStore";

const imageStore = ImageStore.getImageStore()

class NecrologueStore {
    serverIp: string = "192.168.241.51"
    static necrologueStore: NecrologueStore

    static getNecrologueStore() {
        if (this.necrologueStore === undefined) {
            this.necrologueStore = new NecrologueStore()
        }
        return this.necrologueStore
    }

    //Observables =>
    paginatedNecro: PaginatedNecro = {}
    necro: Necrologue = {}
    allNecrologues: NecrologueList = {}
    modalCreate: boolean = false
    modalEdit: boolean = false

    constructor() {
        makeObservable(this, {
            allNecrologues: observable,
            modalEdit: observable,
            modalCreate: observable,
            setModalCreate: action,
            getModalEdit: computed,
            getModalCreate: computed,
            paginatedNecro: observable,
            necro: observable,
            updateNecro: action,
            getNecro: computed,
            getAllNecrologuesRequest: action,
            getPaginatedNecroRequest: action,
            addRequestNecro: action,
            updateNecrologueList: action,
            updatePaginatedNecro: action,
            deleteNecrologue: action,
            getPaginatedNecro: computed,
            updateAllNecrologues: action,
            getAllNecrologues: computed

        })

    }
   updateAllNecrologues(necro: Necrologue[]) {
        this.allNecrologues.necrologues = necro
    }
    get getAllNecrologues() {
        return this.allNecrologues
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

    updateNecrologueList(necrologues: Necrologue[]) {
        this.paginatedNecro.content = necrologues
    }
    updatePaginatedNecro(paginatedNecro: PaginatedNecro) {
        this.paginatedNecro = paginatedNecro
    }
    get getPaginatedNecro() {
        return this.paginatedNecro
    }
    updateNecro(necro: Necrologue) {
        this.necro = necro
    }
    get getNecro() {
        return this.necro
    }

    async getPaginatedNecroRequest(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/deaths/paginated?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',

        })
        const necrologue = await response.json()
        this.updatePaginatedNecro(necrologue)
    }

    async getAllNecrologuesRequest(locality: string) {
        const response = await fetch(`${urlBase}/deaths?username=${locality}`, {
            method: 'GET',

        })
        const necrologue = await response.json()
        this.updateAllNecrologues(necrologue)
    }

    async deleteNecrologue(username: string, idDeath: string) {
        const response = await fetch(`${urlBase}/users/delete/death?username=${username}&idDeath=${idDeath}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newPaginatedNecro = this.paginatedNecro.content!!.filter((item) => item.idDeath !== idDeath)
            this.updateNecrologueList(newPaginatedNecro)
            this.updateNecro({})
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
    async addRequestNecro(username: string, necrologue: Necrologue, file?: File) {
        await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'muerte', 'muerte', file!!)
        necrologue.imageUrl = imageStore.getImage.link
        const response = await fetch(`${urlBase}/users/add/death?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(necrologue)
        })
        if (response.ok) {
            this.paginatedNecro.content?.push(necrologue)
            this.necro = necrologue
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
    async editNecro(locality: string, necroId: string, necro: Necrologue, file?: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'muerte', 'muerte', file!!)
            necro.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/update/death?username=${locality}&deathId=${necroId}`, {
            method: 'PUT',
            body: JSON.stringify(necro),
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
export default NecrologueStore