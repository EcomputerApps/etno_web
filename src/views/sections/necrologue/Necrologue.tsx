import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Pencil from "../../../assets/menu/create.svg"
import NecrologueStore from "../../../viewmodels/necrologue/NecrologueStore"
import TableNecrologue from "./TableNecrologue"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
import CreateNecrologue from "./create/CreateNecrologue"
const necrologueStore = NecrologueStore.getNecrologueStore()

const Necrologue = () => {

  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    necrologueStore.getRequestNecrologue('Bolea', pageNumber, 5)
  }, [pageNumber])

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    setPageNumber(pageNumber - 1)
  }
  
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Fallecimientos</h2>
          <div className="lg:ml-auto flex ml-1">
            <button onClick={() => necrologueStore.setModalCreate(true)} type="button" className="btnStandard">
              <img src={Pencil} alt="Create" />
              Crear
            </button>
          </div>
          {necrologueStore.getModalCreate ? (
            <div>
              <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                <div className="fixed inset-0 w-screen h-screen">
                  <div className="w-screen  flex justify-start">
                    <CreateNecrologue />
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
        </div>
        <TableNecrologue currentPage={pageNumber} headerList={['nombre', 'fecha de fallecimiento', 'Descripción', 'Acciones']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button onClick={decrementPage} disabled={pageNumber < 1}
          className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward" />
          Anterior
        </button>
        <button onClick={incrementPage} disabled={pageNumber === necrologueStore.getPaginatedNecro.totalPages!! - 1 || necrologueStore.getPaginatedNecro.content?.length === 0}
          className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
      <ToastContainer style={{ margin: "50px" }} />
    </div>
  )
}
export default observer(Necrologue)