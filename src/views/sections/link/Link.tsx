
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../../index.css"
import Pencil from "../../../assets/menu/create.svg"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import LinkStore from "../../../viewmodels/link/LinkStore"
const linkStore = LinkStore.getLinkStore()

const Link = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const navigate = useNavigate()
    const [showModal, setModal] = useState(false)
   
    const [position, setPosition] = useState(0)
    const [newTitle, setNewTitle] = useState("")
    const [newLink, setNewLink] = useState("")

    useEffect(() => {
        linkStore.getRequestLink('Bolea', pageNumber, 12)
    }, [pageNumber])
    function editLink(title: string, link: string, pos: number) {
        linkStore.setTitle(title)
        linkStore.setLink(link)
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
    const deleteLink = async (link: string) => {
        await linkStore.deleteLink('Bolea', link)
    }

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }
    return (
        <div className="flex relative flex-col h-full gap-4 w-full">
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enlaces</h2>
                <div className="ml-auto">
                    <button onClick={() => navigate("/addLink")} type="button"  className="btnStandard">
              <img src={Pencil} alt="Create"/>
                        Crear
                    </button>
                </div>
            </div>
            <div className="relative  w-full overflow-x-auto shadow-md sm:rounded-lg">
                <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <div className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <div className="flex md:w-1/3 w-full m-auto  p-5 shadow-xl  ">
                        </div>
                    </div>
                </div>
            </div>
            {showModal ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center ">
                        <div className="w-1/3 h-1/2 flex flex-col rounded-md">
                            <button className="  text-blue-600  font-medium place-self-end bg-white rounded-full w-7 h-7 border-dark-purple border-2 mb-1 " onClick={() => setModal(false)}>X</button>
                            <div className="w-full  max-h-60 rounded-md flex flex-wrap bg-gray-100 relative">
                                <p className="font-bold text-xl uppercase underline p-3 w-full text-center underline-offset-4 " >Editar</p>
                                <div className="flex flex-wrap md:h-40 h-1/2 max-h-40  border-t-2 border-b-2 p-2 w-full">
                                    <div className="flex flex-col w-full">
                                        <input autoFocus className="w-full border-2 p-2 rounded-md focus:outline-none focus:border-indigo-800" defaultValue={linkStore.getTitle} onChange={(e) => setNewTitle(e.currentTarget.value)}></input>
                                        <input className="w-full border-2 p-2 rounded-md focus:outline-none focus:border-indigo-800" defaultValue={linkStore.getLink} onChange={(e) => setNewLink(e.currentTarget.value)}></input>
                                    </div>
                                </div>
                                <div className=" absolute flex w-full justify-center bottom-1   ">
                                    <button className="regular-btn disabled:bg-gray-600" disabled={true} onClick={() => saveEdition(newTitle, newLink)}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div className=" w-full h-3/4">
                <div className={"md:w-full w-1/2 md:h-full grid md:grid-cols-4 md:grid-rows-3"}>
                    {linkStore.paginatedLink.content?.map((link, index) => (
                        linkStore.paginatedLink.content!!.length > 0 &&
                        <div key={index} className="border-2 m-1 rounded-md relative bg-gray-100 shadow-md">
                            <div className="h-1/3 p-2 md:text-center overflow-hidden  md:flex md:items-center md:justify-center">{link.title}</div>
                            <div className="h-1/3 md:flex m-auto items-center text-blue-500 hover:text-blue-600 hover:font-medium justify-center  rounded-b-md text-xl overflow-hidden bg-gray-200 "><a href={link.url}>{link.url}</a></div>
                            <div className="md:absolute flex m-auto md:justify-center md:bottom-1 md:left-0 md:right-0 h-1/5">
                                <button className="regular-btn md:mr-5 mr-10" onClick={() => editLink(link.title!!, link.url!!, index)}>Editar</button>
                                <button className="regular-btn" onClick={() => deleteLink(link.title!!)}>Borrar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
                <button
                    className="btnStandard mr-10" onClick={decrementPage} disabled={pageNumber === 0}>
                    <img src={arrowLeft} alt="backward"/>
                    Anterior
                </button>
                <button
                    className="btnStandard"
                    onClick={incrementPage} disabled={pageNumber === linkStore.getPaginatedLink.totalPages!! - 1 || linkStore.getPaginatedLink.content?.length === 0}>
                    Siguiente
                    <img src={arrowRight} alt="forward"/>
                </button>
            </div>
        </div>
    )
}
export default observer(Link)