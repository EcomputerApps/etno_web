
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../../index.css"
import Pencil from "../../../assets/menu/create.svg"
import logoEtno from '../../../assets/logo_etno.png';
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import LinkStore from "../../../viewmodels/link/LinkStore"
import { toast, ToastContainer } from "react-toastify"
import { Link } from "../../../models/section/Section"
import CreateLink from "./create/CreateLink"
import EditLink from "./create/EditLink"

const linkStore = LinkStore.getLinkStore()


const LinkPage = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const navigate = useNavigate()
    const [showModal, setModal] = useState(false)

    const [position, setPosition] = useState(0)
    const [newTitle, setNewTitle] = useState("")
    const [newLink, setNewLink] = useState("")

    useEffect(() => {
        linkStore.getRequestLink('Bolea', pageNumber, 12)
    }, [pageNumber])
    function editLink(title: string, link: string, id: string, pos: number) {
        linkStore.setTitle(title)
        linkStore.setLinkString(link)
        linkStore.setId(id)
        setPosition(pos)
        setModal(true)
    }
    function saveEdition(title: string, url: string) {
        linkStore.getPaginatedLink.content?.map((link, index) => {
            if (index === position) {
                setModal(false)
                return link.title!! = title, link.url = url
            }
        })
    }
    const deleteLink = async (idLink: string) => {
        await linkStore.deleteLink('Bolea', idLink)
    }
    function updateLink(linkId: string) {
        if (linkStore.getTitle === '' || linkStore.getLinkString === '') {
            toast.info('Rellene los campos', {
                position: 'top-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            const linkNew: Link = {
                title: linkStore.getTitle,
                url: linkStore.getLinkString
            }
            linkStore.editLink('Bolea', linkId, linkNew)
            saveEdition(linkStore.getTitle, linkStore.getLinkString)
            setModal(false)
        }
    }
    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }
    return (
        <div className="w-full h-full min-w-5/6 relative flex flex-col">
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enlaces</h2>
                <div className="ml-auto">
                    <button onClick={() => linkStore.setModalCreate(true)} type="button" className="btnStandard">
                        <img src={Pencil} alt="Create" />
                        Crear
                    </button>
                </div>
                {linkStore.getModalCreate ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-center mt-10">
                                    <CreateLink />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
                {/*NOT IMPLEMENTED YET*/}
                {linkStore.getModalEdit ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-center mt-10">
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
            {showModal ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center mt-10">
                                <div className="flex flex-col lg:m-auto lg:w-1/2 mt-5 w-3/4 lg:h-screen ">
                                    <div className="bg-white border-2  rounded-md">
                                        <div className="w-full  max-h-60  flex flex-wrap">
                                            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                                                <div className="w-full flex flex-row p-2 justify-between">
                                                    <img src={logoEtno} alt="logo_Etno"></img>
                                                    <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>editar ENLACES</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap md:h-40 h-1/2 max-h-40  border-t-2 border-b-2 p-2 w-full">
                                                <div className="flex flex-col w-full">
                                                    <input autoFocus className="my-2 w-full border-2 p-2 rounded-md focus:outline-none focus:border-indigo-800" defaultValue={linkStore.getTitle} onChange={(e) => linkStore.setTitle(e.currentTarget.value)}></input>
                                                    <input className="w-full border-2 p-2 rounded-md focus:outline-none focus:border-indigo-800" defaultValue={linkStore.getLinkString} onChange={(e) => linkStore.setLinkString(e.currentTarget.value)}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex w-full justify-center p-3">
                                            <button className="btnStandard disabled:bg-gray-600 mr-5" onClick={() => updateLink(linkStore.getId)}>Guardar</button>
                                            <button className="btnStandard disabled:bg-gray-600" onClick={() => setModal(false)}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div className="flex flex-1 overflow-y-auto w-full h-3/4  ">
                <div className={"w-full grid lg:grid-cols-4 lg:grid-rows-3 grid-cols-1"}>
                    {linkStore.paginatedLink.content?.map((link, index) => (
                        linkStore.paginatedLink.content!!.length > 0 &&
                        <div key={index} className="border-2 m-1 rounded-md relative bg-gray-100 shadow-md">
                            <div className="h-1/3 p-2 text-center overflow-hidden  flex items-center justify-center">{link.title}</div>
                            <div className="h-1/3 flex m-auto items-center text-blue-500 hover:text-blue-600 hover:font-medium justify-center  rounded-b-md text-xl overflow-hidden bg-gray-200 "><a href={link.url}>{link.url}</a></div>
                            <div className="flex m-auto justify-center lg:pt-5 h-1/5">
                                <button className="btnStandard mr-5 h-8 lg:h-10" onClick={() => editLink(link.title!!, link.url!!, link.idLink!!, index)}>Editar</button>
                                <button className="btnStandard h-8 lg:h-10" onClick={() => linkStore.setModalEdit(true)}>Borrar</button>
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
            <ToastContainer style={{ marginBottom: "50px" }} />
        </div>
    )
}
export default observer(LinkPage)