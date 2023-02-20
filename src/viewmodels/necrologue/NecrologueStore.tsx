import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Necrologue, PaginatedNecro } from "../../models/section/Section";

class NecrologueStore{
    serverIp : string = "192.168.137.1"
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

    constructor() {
        makeObservable(this, {
            paginatedNecro: observable,
            necro: observable,
            updateNecro: action,
            getNecro: computed,
            getRequestNecrologue: action,
            addRequestNecro: action,
            updateNecrologueList: action,
            updatePaginatedNecro: action,
            deleteNecrologue: action,
            getPaginatedNecro: computed

        })
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

    async getRequestNecrologue(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/deaths?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',

        })
        const necrologue = await response.json()
        this.updatePaginatedNecro(necrologue)
    }
    async deleteNecrologue(username: string, name: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/death?username=${username}&name=${name}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newPaginatedNecro = this.paginatedNecro.content!!.filter((item) => item.name !== name)
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

    async addRequestNecro(username: string, necrologue: Necrologue) {
        const response = await fetch(`http://${this.serverIp}:8080/users/add/death?username=${username}`, {
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

export default NecrologueStore