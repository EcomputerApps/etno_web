import { action, computed, makeObservable, observable } from "mobx"

class ReserveStore{
    serverIp: string = "192.168.241.51"
    static reserveStore: ReserveStore

    static getReserveStore(){
        if(this.reserveStore === undefined){
            this.reserveStore = new ReserveStore()
        }
        return this.reserveStore
    }

    modalCreate: boolean = false
    modalEdit: boolean = false

    constructor(){
        makeObservable(this,{
            modalEdit: observable,
            modalCreate: observable,
            setModalCreate: action,
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

}
export default ReserveStore