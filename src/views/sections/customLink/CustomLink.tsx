import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Pencil from "../../../assets/menu/create.svg"
import { CustomLink } from "../../../models/section/Section"
import CreateCustomLink from "./create/CreateCustomLink"
import EditCustomLink from "./create/EditCustomLink"
import CustomLinkStore from "../../../viewmodels/customLink/CustomLinkStore"
import { ToastContainer } from "react-toastify"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"

const customLinkStore = CustomLinkStore.getCustomLinkStore()

const CustomLinkPage = () => {
    const [pageNumber, setPageNumber] = useState(0)
    useEffect(() => {
        customLinkStore.getRequestCustomLink('Bolea', pageNumber, 12)
    }, [pageNumber])

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }

    const linkTemp: CustomLink = {
        name: "Enlace temp",
        webUrl: "Www.algo.es",
        iconName: "figura 1"
    }

    function saveLink(link: CustomLink) {
        customLinkStore.setEditLinkModal(true)
        customLinkStore.updateCustomLink(link)
    }
    const deleteCustomLink = async (idLink: string) => {
        await customLinkStore.deleteCustomLink('Bolea', idLink)
    }
    return (
        <div className="w-full h-full min-w-5/6 relative flex flex-col">
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enlaces Personalizados</h2>
                <div className="ml-auto">
                    <button type="button" className="btnStandard" onClick={() => customLinkStore.setCreateLinkModal(true)}>
                        <img src={Pencil} alt="Create" />
                        Crear
                    </button>
                </div>
            </div>
            {customLinkStore.getCreateLinkModal ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center">
                                <CreateCustomLink />
                            </div>
                        </div>
                    </div>
                </div> 
            ) : <></>}
            {customLinkStore.getEditLinkModal ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center">
                                <EditCustomLink />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div className="relative  w-full overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <div className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <div className="flex md:w-1/3 w-full m-auto  p-5 shadow-xl  ">
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 overflow-y-auto lg:overflow-hidden w-full h-3/4">
                <div className="w-full grid lg:grid-cols-4 lg:grid-rows-3  grid-cols-1">
                    {customLinkStore.getPaginatedCustomLink.content?.map((item, index) => (
                        customLinkStore.getPaginatedCustomLink.content!!.length > 0 &&
                        <div key={index} className="border-2  p-1 rounded-md relative bg-gray-100 shadow-md lg:h-full h-40  ">
                            <div className="h-1/3 p-2 text-center overflow-hidden  flex items-center justify-center flex-col">{item.name}</div>
                            <div className="h-1/3 flex m-auto items-center text-blue-500 hover:text-blue-600 
                            hover:font-medium justify-center   text-xl overflow-hidden bg-gray-200 flex-col"><a href={item.webUrl}>{item.webUrl}</a></div>
                                                       <div className="h-1/3  p-2 text-center overflow-hidden  flex items-center bg-gray-200 justify-center flex-row">
                                <button className="btnStandard mr-5 h-8 lg:h-10" onClick={() => saveLink(item)}>Editar</button>
                                <button className="btnStandard h-8 lg:h-10" onClick={()=>deleteCustomLink(item.idCustomLink!!)}>Borrar</button>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
            <ToastContainer style={{ marginBottom: "50px" }} />
            <div className="flex flex-2  items-center justify-center md:flex-row flex-col ">
                <button
                    className="btnStandard mr-10" onClick={decrementPage} disabled={pageNumber === 0}>
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                <button
                    className="btnStandard"
                    onClick={incrementPage} disabled={pageNumber === customLinkStore.getPaginatedCustomLink.totalPages!! - 1 || customLinkStore.getPaginatedCustomLink.content?.length === 0}>
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>
        </div>
    )
}
export default observer(CustomLinkPage)