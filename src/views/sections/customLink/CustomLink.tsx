import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Pencil from "../../../assets/menu/create.svg"
import { CustomLink} from "../../../models/section/Section"
import CreateCustomLink from "./create/CreateCustomLink"
import EditCustomLink from "./create/EditCustomLink"
import CustomLinkStore from "../../../viewmodels/customLink/CustomLinkStore"

const customLinkStore = CustomLinkStore.getCustomLinkStore()

const CustomLinkPage = () => {
   // useEffect(() => {
       // customLinkStore.getRequestLink('Bolea', pageNumber, 8)
    //}, [pageNumber])
    const [pageNumber, setPageNumber] = useState(0)
    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }
    
    const linkTemp: CustomLink = {
        title: "Enlace temp",
        url: "Www.algo.es",
        icon: "figura 1"
    }

    function saveLink(link: CustomLink){
        customLinkStore.setEditLinkModal(true)
        customLinkStore.updatePersonalLink(link)
    }
    return (
        <div className="w-full h-full min-w-5/6 relative flex flex-col">
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enlaces Personalizados</h2>
                <div className="ml-auto">
                    <button type="button" className="btnStandard" onClick={()=>customLinkStore.setCreateLinkModal(true)}>
                        <img src={Pencil} alt="Create" />
                        Crear
                    </button>
                </div>
            </div>
            {customLinkStore.getCreateLinkModal ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-center mt-10">
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
                                <div className="w-screen  flex justify-center mt-10">
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
            <div className="flex flex-1 overflow-y-auto w-full h-3/4  ">
                <div className={"w-full grid lg:grid-cols-4 lg:grid-rows-3 grid-cols-1"}>
                    <div className="border-2 m-1 rounded-md relative bg-gray-100 shadow-md">
                        <div className="h-1/4 p-2 text-center overflow-hidden  flex items-center justify-center flex-col">{linkTemp.title}</div>
                        <div className="h-1/4 flex m-auto items-center text-blue-500 hover:text-blue-600 
                            hover:font-medium justify-center   text-xl overflow-hidden bg-gray-200 flex-col"><a href={linkTemp.url}>{linkTemp.url}</a></div>
                        <div className="h-1/4 p-2 text-center overflow-hidden  flex items-center justify-center flex-col">
                            <img className="bg-black" src={Pencil} alt="Create"></img></div>
                        <div className="h-1/4  p-2 text-center overflow-hidden  flex items-center bg-gray-200 justify-center flex-row">
                            <button className="btnStandard mr-5 h-8 lg:h-10" onClick={()=> saveLink(linkTemp)}>Editar</button>
                            <button className="btnStandard h-8 lg:h-10" >Borrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default observer(CustomLinkPage)