class ReserveStore{
    serverIp: string = "192.168.241.51"
    static reserveStore: ReserveStore

    static getReserveStore(){
        if(this.reserveStore === undefined){
            this.reserveStore = new ReserveStore()
        }
        return this.reserveStore
    }
}
export default ReserveStore