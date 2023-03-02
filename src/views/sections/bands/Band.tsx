import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Pencil from "../../../assets/menu/create.svg"
import BandStore from "../../../viewmodels/band/BandsStore"
import TableBand from "./TableBand"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
import CreateBand from "./create/CreateBand"
const bandStore = BandStore.getBandStore()

const Band = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    bandStore.getRequestBand('Bolea', pageNumber, 5)
  }, [pageNumber])
  useEffect(() => {
    bandStore.getAllBandRequest("Bolea")
  }, [])


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
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Bandos</h2>
          <div className="ml-auto">
            <button onClick={() => bandStore.setModalCreate(true)} type="button" className="btnStandard">
              <img src={Pencil} alt="Create" />
              Crear
            </button>
          </div>
        </div>
        <TableBand currentPage={pageNumber} headerList={['Título', 'Descripción', 'fecha', 'acciones']} />
      </div>
      {bandStore.getModalCreate ? (
        <div>
          <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
            <CreateBand />
          </div>
        </div>
      ) : <></>}
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button onClick={decrementPage} disabled={pageNumber < 1}
          className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward" />
          Anterior
        </button>
        <button onClick={incrementPage} disabled={pageNumber === bandStore.getPaginatedBands.totalPages!! - 1 || bandStore.getPaginatedBands.content?.length === 0}
          className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
      <ToastContainer style={{ margin: "50px" }} />
    </div>
  )
}
export default observer(Band)