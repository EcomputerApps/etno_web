import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Pencil from "../../../assets/menu/create.svg"
import SposnsorStore from "../../../viewmodels/sponsor/SponsorStore"
import TableSponsor from "./TableSponsor"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
const sponsorStore = SposnsorStore.getSponsorStore()

const Sponsor = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    sponsorStore.getRequestSponsor('Bolea', pageNumber, 5)
  }, [pageNumber])

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    if (pageNumber > 0)
      setPageNumber(pageNumber - 1)
  }

  return (
    <div className="w-full h-full  relative">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Patrocinadores</h2>
          <div className="ml-auto">
            <button onClick={() => navigate("/addSponsor")} type="button" className="btnStandard">
              <img src={Pencil} alt="Create"/>
              Crear
            </button>
          </div>
        </div>
        <TableSponsor currentPage={pageNumber} headerList={['Título', 'Descripción', 'Teléfono', 'acciones']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button  onClick={decrementPage} disabled={pageNumber<1} 
        className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward"/>
          Anterior
        </button>
        <button  onClick={incrementPage} disabled={pageNumber === sponsorStore.getPaginatedSponsor.totalPages!! -1 || sponsorStore.getPaginatedSponsor.content?.length === 0} 
        className="btnStandard">
          Siguiente
         <img src={arrowRight} alt="forward"/>
        </button>
      </div>
      <ToastContainer style={{ margin: "50px" }}/>
    </div>
  )
}

export default observer(Sponsor)