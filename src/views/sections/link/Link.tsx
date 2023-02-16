import { useNavigate } from "react-router-dom"
import Search from "../../../assets/menu/search.svg"
import "../../../index.css"
import LinkStore from "../../../viewmodels/link/LinkStore"
const linkStore= LinkStore.getLinkStore()
const content = [
    {
        "title": "Pagina web del ayuntamiento de Sabiñanigodsadsdasdasd       ",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.turismodearagon.com/ficha/bolea/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }, {
        "title": "pagian web de ayuntamiento de sabiñanigo",
        "url": "https://www.sabiñanigo.es/"

    }
]
const Link = () => {
    const navigate = useNavigate()
    function edit(title: string, link: string){
        navigate("/addLink")
        linkStore.setTitle(title)
       

    }
    return (
        <div className="flex relative flex-col h-full gap-4 w-full">
            <div className="flex flex-row">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enlaces</h2>
                <div className="ml-auto">
                    <button onClick={() => navigate("/addLink")} type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-indigo-600 px-4 py-2 text-sm font-medium text-white    shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>
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
            <div className=" w-full h-3/4">
                <div className=" h-full grid md:grid-cols-4 overflow-hidden">
                    {content.slice(0, 12).map((content, index) => (
                        <div key={index} className="border-2  bg-gray-100 m-2 rounded-md shadow-md relative">
                            <div className="h-1/3  p-2 md:text-center  overflow-hidden">{content.title}</div>
                            <div className="md:flex m-auto items-center text-blue-600 hover:text-blue-400 justify-center h-1/3 rounded-b-md text-xl overflow-hidden bg-gray-200 "><a href={content.url}>{content.url}</a></div>
                            <div className="md:absolute flex m-auto md:justify-center md:bottom-1 md:left-0 md:right-0 h-1/5">
                                <button className="post-btn" onClick={()=>edit(content.title, content.url)}>Editar</button>
                                <button className="regular-btn">Borrar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
                <button
                    className="inline-flex disabled:bg-gray-500 w-fit items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" >
                    <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Anterior
                </button>
                <button
                    className="inline-flex items-center rounded-md border 
         disabled:bg-gray-500 border-gray-300 bg-indigo-800
          px-4 py-3 text-sm font-medium text-gray-300 
          shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">
                    Siguiente
                    <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    )
}
export default Link