import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import "../../../index.css"
import Pencil from "../../../assets/menu/create.svg"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import LinkStore from "../../../viewmodels/link/LinkStore"
import {ToastContainer } from "react-toastify"
import { Link } from "../../../models/section/Section"
import CreateLink from "./create/CreateLink"
import EditLink from "./create/EditLink"

const linkStore = LinkStore.getLinkStore()

const LinkPage = () => {

    const [pageNumber, setPageNumber] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const [delName, setDelName] = useState<string>("")
    const [delId, setDelId] = useState<string>("")

    useEffect(() => {
        linkStore.getRequestLink(localStorage.getItem('user_etno_locality')!, pageNumber, 12)
    }, [pageNumber])

    function deleteConfirmation(link: Link) {
        setConfirm(true)
        setDelName(link.title!!)
        setDelId(link.idLink!!)
    }

    const deleteLink = async (idLink: string) => {
        await linkStore.deleteLink(localStorage.getItem('user_etno_locality')!, idLink)
        setConfirm(false)
    }

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }

    function saveLink(link: Link) {
        linkStore.setModalEdit(true)
        linkStore.updateLink(link)
    }

    return (
        <div className="lg:w-full h-full min-w-5/6 relative flex flex-col">
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enlaces</h2>
                <div className="lg:ml-auto flex ml-1 ">
                    <button onClick={() => linkStore.setModalCreate(true)} type="button" className="btnStandard">
                        <img src={Pencil} alt="Create" />
                        Crear
                    </button>
                </div>
                {linkStore.getModalCreate ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-start">
                                    <CreateLink />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
                {linkStore.getModalEdit ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-start">
                                    <EditLink />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
            </div>
            <div className="relative  w-full overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <div className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <div className="flex md:w-1/3 w-full m-auto  p-5 shadow-xl  ">
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 overflow-y-auto lg:overflow-hidden w-full h-3/4  ">
                <div className={"w-full grid lg:grid-cols-4 lg:grid-rows-3 grid-cols-1"}>
                    {linkStore.paginatedLink.content?.map((linkMap, index) => (
                        linkStore.paginatedLink.content!!.length > 0 &&
                        <div key={index} className={`border-2 p-1 rounded-md relative bg-gray-100 shadow-md lg:h-full  ${linkStore.paginatedLink.content!!.length > 2 ? 'h-40'
                            : 'h-60'}`}>
                            <div className="h-1/3 p-2 text-center overflow-hidden  flex items-center justify-center">{linkMap.title}</div>
                            <div className="h-1/3 flex m-auto items-center text-blue-500 hover:text-blue-600 hover:font-medium justify-center  rounded-b-md text-xl overflow-hidden bg-gray-200 "><a href={linkMap.url}>{linkMap.url}</a></div>
                            <div className="flex m-auto justify-center lg:pt-5 h-1/5 pt-3">
                                <button className="btnStandard mr-5 h-8 lg:h-10" onClick={() => saveLink(linkMap)}>Editar</button>
                                <button className="btnStandard h-8 lg:h-10" onClick={() => deleteConfirmation(linkMap)}>Borrar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-2  items-center justify-center md:flex-row flex-col ">
                <button
                    className="btnStandard mr-10" onClick={decrementPage} disabled={pageNumber === 0}>
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                <button
                    className="btnStandard"
                    onClick={incrementPage} disabled={pageNumber === linkStore.getPaginatedLink.totalPages!! - 1 || linkStore.getPaginatedLink.content?.length === 0}>
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {delName}?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteLink(delId)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <ToastContainer style={{ marginBottom: "50px" }} />
        </div>
    )
}
export default observer(LinkPage)