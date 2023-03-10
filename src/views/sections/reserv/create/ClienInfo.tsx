import ReserveStore from "../../../../viewmodels/reserv/ReservStore"
const reservStore = ReserveStore.getReserveStore()
const ClientInfo = () =>{
    return(
        <div className="flex flex-col md:m-auto w-1/2 md:h-screen border-2 rounded-md bg-white">
        SHOW CLIENT INFO
          <button className="btnStandard" onClick={()=>reservStore.setModalClientInfo(false)}>Vovler</button>
        </div>
    )
}
export default ClientInfo