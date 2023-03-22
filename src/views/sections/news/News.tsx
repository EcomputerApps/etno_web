import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Pencil from "../../../assets/menu/create.svg"
import NewsStore from "../../../viewmodels/news/NewsStore"
import TableNews from "./TableNews"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
import CreateNews from "./create/CreateNews"

const newsStore = NewsStore.getNewsStore()

const News = () => {
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    newsStore.getRequestNews(localStorage.getItem('user_etno_locality')!, pageNumber, 5)
  }, [pageNumber])

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    if (pageNumber > 0)
      setPageNumber(pageNumber - 1)
  }

  return (
    <div className="w-full h-full   relative">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Noticias</h2>
          <div className="lg:ml-auto flex ml-1">
            <button onClick={() => newsStore.setModalCreate(true)} type="button" className="btnStandard">
              <img src={Pencil} alt="Create" />
              Crear
            </button>
          </div>
          {newsStore.getModalCreate ? (
            <div>
              <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                <div className="fixed inset-0 w-screen h-screen">
                  <div className="w-screen  flex justify-start ">
                    <CreateNews />
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
        </div>
        <TableNews currentPage={pageNumber} headerList={['Categoría', 'Título', 'fecha', 'Descripción', 'Acciones']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button onClick={decrementPage} disabled={pageNumber < 1} className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward" />
          Anterior
        </button>
        <button onClick={incrementPage}
          disabled={pageNumber === newsStore.getPaginatedNews.totalPages!! - 1 || newsStore.getPaginatedNews.content?.length === 0}
          className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
      <ToastContainer style={{ marginBottom: "50px", marginLeft: "50px" }} />
    </div>
  )
}
export default observer(News)