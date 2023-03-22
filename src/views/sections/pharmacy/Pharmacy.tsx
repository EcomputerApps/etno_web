import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import PharmacyStore from "../../../viewmodels/pharmacy/PharmacyStore"
import TablePharmacy from "./TablePharmacy"
import Pencil from "../../../assets/menu/create.svg"
import POD from "../../../assets/menu/pharmacyOnDuty.svg"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
import CreatePharmacy from "./create/CreatePharmacy"
import PharmacyOnDuty from "./PharmacyOnDuty"

const pharmacyStore = PharmacyStore.getPharmacyStore()

const Pharmacy = () => {

  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    pharmacyStore.getRequestPharmacy(localStorage.getItem('user_etno_locality')!, pageNumber, 5)
  }, [pageNumber])

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    setPageNumber(pageNumber - 1)
  }
  return (
    <div className="w-full h-full  relative ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Farmacias</h2>
          <div className="lg:ml-auto  flex ml-1">
            <button onClick={() => pharmacyStore.setModalCalendar(true)} type="button"
              className="btnStandard mr-5 h-12">
              <img src={POD} alt="de guardia" />
              Farmacias de guardia
            </button>
            <button onClick={() => pharmacyStore.setModalCreate(true)} type="button"
              className="btnStandard ">
              <img src={Pencil} alt="create" />
              Crear
            </button>
          </div>
          {pharmacyStore.getModalCreate ? (
            <div>
              <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                <div className="fixed inset-0 w-screen h-screen">
                  <div className="w-screen  flex justify-start">
                    <CreatePharmacy />
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
          {pharmacyStore.getModalCalendar ? (
            <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center"  >
              <div className=" w-screen h-screen lg:top-0 top-5 -left-1 fixed">
                <div className="flex w-full aspect-square">
                  <PharmacyOnDuty />
                </div>
              </div> </div>
          ) : <></>}
        </div>
        <TablePharmacy currentPage={pageNumber} headerList={['tipo', 'nombre', 'horario', 'Dirección', 'Teléfono', 'Pagina Web', 'acciones']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center lg:flex-row flex-col">
        <button onClick={decrementPage} disabled={pageNumber < 1} className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward" />
          Anterior
        </button>
        <button onClick={incrementPage}
          disabled={pageNumber === pharmacyStore.getPaginatedPharmacy.totalPages!! - 1 || pharmacyStore.getPaginatedPharmacy.content?.length === 0}
          className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
      <ToastContainer style={{ margin: "50px" }} />
    </div>
  )
}
export default observer(Pharmacy)
