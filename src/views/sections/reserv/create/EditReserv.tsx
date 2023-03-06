import ReserveStore from "../../../../viewmodels/reserv/ReservStore"
const reservStore = ReserveStore.getReserveStore()
const EditReserv = () =>{
    return(
        <div className="flex flex-col md:m-auto w-1/2 md:h-screen border-2 rounded-md bg-white">
          EDIT RESERV
          <button className="btnStandard" onClick={()=>reservStore.setModalEdit(false)}>Vovler</button>
        </div>
    )
}
export default EditReserv