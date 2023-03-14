import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Pencil from "../../../assets/menu/create.svg"
import TourismStore from "../../../viewmodels/tourism/TourismStore"
import TableTourism from "./TableTourism"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
import CreateTourism from "./create/CreateTourism"
const tourisStore = TourismStore.getTourismStore()

const Tourism = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    tourisStore.getRequestTourism('Bolea', pageNumber, 5)
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
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Turismo</h2>
          <div className="ml-auto">
            <button onClick={() => tourisStore.setModalCreate(true)} type="button" className="btnStandard">
              <img src={Pencil} alt="Create"/>
              Crear
            </button>
          </div>
    
      {tourisStore.getModalCreate ? (
        <div>
          <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
            <div className="fixed inset-0 w-screen h-screen">
              <div className="w-screen  flex justify-start">
              <CreateTourism />
              </div>
            </div>
          </div>
        </div>
      ) : <></>}
        </div>
        <TableTourism currentPage={pageNumber} headerList={['tipo', 'Título', 'Descripción', 'Acciones']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button onClick={decrementPage} disabled={pageNumber < 1}
         className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward"/>
          Anterior
        </button>
        <button onClick={incrementPage}  
        disabled={pageNumber ===  tourisStore.getPaginatedTourism.totalPages!! - 1 || tourisStore.getPaginatedTourism.content?.length === 0} 
        className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward"/>
        </button>
      </div>
      <ToastContainer style={{ margin: "50px" }} />
    </div>
  )
}
export default observer(Tourism)