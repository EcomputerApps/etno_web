import { useState } from "react"
import ReserveStore from "../../../../viewmodels/reserv/ReservStore"
const reserveStore = ReserveStore.getReserveStore()
const ClientInfo = () => {
  function confirmReserve(idReserve: string) {
    reserveStore.confirmReserve("Bolea", idReserve)
}
const deleteReserva = async (reserve: string) => {
  await reserveStore.deleteReserve("Bolea", reserve)
  reserveStore.setModalClientInfo(false)
}
  const [reserve, setreserve] = useState(reserveStore.getReserve)
  return (
    <div className="flex flex-col md:m-auto w-1/2 md:h-screen">
      <div className="w-1/2 m-auto">
        <div className="flex justify-end">
          <button className="  text-blue-600  font-medium  bg-white rounded-full w-7 h-7 border-dark-purple border-2 mb-1 " onClick={() => reserveStore.setModalClientInfo(false)}>X</button>
        </div>
        <div className=" m-auto bg-white p-3 rounded-md border-2">
          <div className="flex flex-col">
            <label className="font-medium">Telefono o Correo electronico</label>
            <label className="border-2 rounded-md p-1">{reserve.reserveUsers!![0].data}</label>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Lugar reservado</label>
            <label className="border-2 rounded-md p-1">{reserve.reserveUsers!![0].place?.name}</label>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Estado de reserva</label>
            <label className="border-2 rounded-md p-1">{reserve.reserveUsers!![0].isReserved ?  <label className="text-green-600 ">Confirmado</label> : <label className="text-gray-600   ">Pendiente</label>}</label>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Description</label>
            <label className="border-2 rounded-md p-1">{reserve.reserveUsers!![0].description}</label>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Telefono de contacto</label>
            <label className="border-2 rounded-md p-1">{reserve.reserveUsers!![0].reservePhone}</label>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Fecha de reserva</label>
            <label className="border-2 rounded-md p-1">{reserve.reserveUsers!![0].date}</label>
          </div>
          <div className="flex flex-col">
            <label className="font-medium"> Horario</label>
            <div className="border-2 rounded-md p-1">
              {reserve.reserveUsers!![0].reserveSchedules?.map((item, index) => (
                <label key={index}>{item.date}</label>
              ))}
            </div>
            <div className="flex justify-center items-center mt-3">
              <div hidden={reserve.reserveUsers!![0].isReserved}>
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3" onClick={() => confirmReserve(reserve.idReserve!!)} >Confirmar</a>
              </div>
                   <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline " onClick={() => deleteReserva(reserve.idReserve!!)}>Rechazar</a>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}
export default ClientInfo