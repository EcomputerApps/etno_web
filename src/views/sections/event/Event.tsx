import { observer } from 'mobx-react-lite'
import { useEffect, useState } from "react"
import Pencil from "../../../assets/menu/create.svg"
import EventStore from "../../../viewmodels/Event/EventStore"
import TableEvent from "./TableEvent"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
import CreateEvent from "./create/CreateEvent"
import { CSVLink } from 'react-csv';
const eventStore = EventStore.getEventStore()

const Event = () => {
  const headers = [
    { label: 'Título', key: 'title' },
    { label: 'Descripción', key: 'description' },
    { label: 'Tipo', key: 'hasSubscription' },
    { label: 'Precio', key: 'reservePrice' },
    { label: 'Plazas', key: 'seats' },
    { label: 'Capacidad', key: 'capacity' },
    { label: 'Localidad', key: 'username' },
    { label: 'Dirección', key: 'address' },
    { label: 'Organmización', key: 'organization' },
  ]

  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    eventStore.getPaginatedEventsRequest(localStorage.getItem('user_etno_locality')!, pageNumber, 5)
  }, [pageNumber])

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    setPageNumber(pageNumber - 1)
  }

  return (
    <div className="w-full h-full  relative">
      <div className=" flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Eventos</h2>
          <div className="mainButtonsDiv">
            {eventStore.getPaginatedEvents.content! && (
              <div hidden={eventStore.getPaginatedEvents.content.length === 0}>
                <CSVLink
                  data={eventStore.getPaginatedEvents.content!}
                  filename={'events.csv'}
                  enclosingCharacter={` `}
                  className="btnStandard mr-3"
                  target="_blank"
                  headers={headers} >Exportar a excel
                </CSVLink>
              </div>)}
            <button onClick={() => eventStore.deleteAllById(localStorage.getItem('user_etno_locality')!)} type="button" className="btnStandard ">
              <img src={Pencil} alt="Create" />
              Eliminar
            </button>
            <button onClick={() => eventStore.setModalCreate(true)} type="button" className="btnStandard ">
              <img src={Pencil} alt="Create" />
              Crear
            </button>
          </div>
          {eventStore.getModalCreate ? (
            <div>
              <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                <div className="fixed inset-0 w-screen h-screen">
                  <div className="w-screen  flex justify-start">
                    <CreateEvent />
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
        </div>
        <TableEvent currentPage={pageNumber} headerList={['Seleccionar', 'Título', 'Descripción', 'Tipo', 'Precio', 'Plazas', 'Capacidad', 'Localidad', 'Dirección', 'Organización', 'Acciones']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button onClick={decrementPage} disabled={pageNumber === 0}
          className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward" />
          Anterior
        </button>
        <button onClick={incrementPage} disabled={pageNumber === eventStore.getPaginatedEvents.totalPages!! - 1 || eventStore.getPaginatedEvents.content?.length === 0}
          className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
      <ToastContainer style={{ margin: "50px" }} />
    </div>
  )
}
export default observer(Event)