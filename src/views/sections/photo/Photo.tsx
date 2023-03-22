import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import ImageSize from "../../../viewmodels/ImageSize"
import photosRed from "../../../assets/menu/photosRed.svg"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import ImageStore from "../../../viewmodels/image/ImageStore"
const imageStore = ImageStore.getImageStore()
const imageSize = ImageSize.getImageSize()

const Photo = () => {

    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        imageStore.getRequestImages(localStorage.getItem('user_etno_locality')!, pageNumber, 6)
    }, [pageNumber])

    const [showModal, setModal] = useState(false)

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }

    return (
        <div className="flex relative flex-col h-full w-full ">
            <div className="flex ">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Fotos</h2>
            </div>
            <div>
                {showModal ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="md:w-1/3 w-full flex flex-col px-2 overflow-auto ">
                                <button className="  text-blue-600  font-medium place-self-end bg-white rounded-full w-7 h-7 border-dark-purple border-2 mb-1 " onClick={() => setModal(false)}>X</button>
                                <img src={imageSize.getLink} className="rounded-md bg-white"></img>
                            </div>
                        </div>
                    </div>
                ) : <></>}
            </div>
            {imageStore.getPaginatedImages.content?.length === 0 ? (
                <div className="flex flex-row p-2 mt-5 rounded-md shadow-md">
                    <img src={photosRed} alt="BIG" />
                    <label className="text-xl my-auto ml-4 mt-3.5 font-medium">No hay Fotos</label>
                </div>
            ) : (
                <div className="relative  w-full overflow-x-auto shadow-md sm:rounded-lg mt-7">
                    <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <div className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                            <div className="flex md:w-1/3 w-full m-auto  p-5 shadow-xl  ">
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className=" flex flex-1 w-full h-4/5 overflow-y-auto" >
                <div className="flex ">
                    <div className="grid grid-cols-1 md:grid-rows-2 md:grid-cols-3 pt-2">
                        {imageStore.getPaginatedImages.content?.map((item, index) => (
                            <div key={index} className="w-full  cursor-pointer rounded-md bg-indigo-100 border-2
                             border-indigo-300 hover:border-indigo-600  items-center justify-center flex-wrap  flex" >
                                <img src={item.link} onClick={(e) => {
                                    setModal(true)
                                    imageSize.setLink(e.currentTarget.src)
                                }} className="block h-full w-full rounded-lg object-scale-down object-center" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-2  items-center justify-center md:flex-row flex-col">
                <button
                    className="btnStandard mr-10" onClick={decrementPage} disabled={pageNumber === 0}>
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                <button
                    className="btnStandard"
                    onClick={incrementPage} disabled={pageNumber === imageStore.getPaginatedImages.totalPages!! - 1 || imageStore.getPaginatedImages.content?.length === 0}>
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>
        </div>
    )
}
export default observer(Photo)