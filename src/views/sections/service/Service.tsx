import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Pencil from "../../../assets/menu/create.svg"
import ServiceStore from "../../../viewmodels/service/ServiceStore"
import TableService from "./TableService"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
import CreateService from "./create/CreateService"
const serviceStore = ServiceStore.getServiceStore()

const Service = () => {

  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    serviceStore.getPaginatedServiceRequest(localStorage.getItem('user_etno_locality')!, pageNumber, 5)
  }, [pageNumber])

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    setPageNumber(pageNumber - 1)
  }

  return (
    <div className="w-full h-full  relative">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Servicios</h2>
          <div className="mainButtonsDiv">
          <button onClick={() => serviceStore.deleteAllById(localStorage.getItem('user_etno_locality')!)
          } type="button" className={`btnStandard ${serviceStore.getPaginatedService.totalElements! < 1 ? 'invisible' : 'visible'}`}>
              <img src={Pencil} alt="Create" />
              Eliminar
            </button>
            <button onClick={() => serviceStore.setModalCreate(true)} type="button" className="btnStandard">
              <img src={Pencil} alt="Create" />
              Crear
            </button>
          </div>
          {serviceStore.getModalCreate ? (
            <div>
              <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                <div className="fixed inset-0 w-screen h-screen">
                  <div className="w-screen  flex justify-start">
                    <CreateService />
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
        </div>
        <TableService currentPage={pageNumber} headerList={['Seleccionar','Categoría', 'nombre', 'Teléfono', 'horario', 'Descripción', 'Pagina Web', 'acciones']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button onClick={decrementPage} disabled={pageNumber < 1}
          className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward" />
          Anterior
        </button>
        <button onClick={incrementPage} disabled={pageNumber === serviceStore.getPaginatedService.totalPages!! - 1 || serviceStore.getPaginatedService.content?.length === 0}
          className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
      <ToastContainer style={{ margin: "50px" }} />
    </div>
  )
}
export default observer(Service)
