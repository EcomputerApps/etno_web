import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import resolved from "../../../assets/menu/resolved.svg"
import error from "../../../assets/menu/error.svg"
import IncidentStore from "../../../viewmodels/incident/IncidentStore"
import Search from "../../../assets/menu/search.svg"
const incidentStore = IncidentStore.getIncidentStore()

const Incident = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [showModal, setModal] = useState(false)

  const arrayIncindent = [{
    "status": false,
    "date": "02/02/2023",
    "title": "nieve",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lectus vel sapien scelerisque tempus et sit amet sem. In mollis sodales enim vitae hendrerit. Ut malesuada interdum libero, et feugiat orci dictum egestas. Aenean tincidunt sem quis molestie feugiat. Proin suscipit erat non ante egestas, nec sollicitudin ipsum posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras id eros a augue feugiat eleifend. Fusce condimentum tempor justo, quis rutrum tortor malesuada quis." +

      "In dictum vehicula est sed lobortis. Vestibulum auctor nulla tellus, nec vehicula magna dapibus sed. Pellentesque risus velit, viverra at luctus eu, varius vitae eros. Suspendisse ac ante viverra, dignissim ex in, posuere mauris. Aenean non fringilla eros, quis posuere tellus. Pellentesque vulputate risus vel feugiat gravida. Duis et tristique urna. Morbi sit amet maximus felis. Nullam at massa id massa hendrerit gravida non quis nibh. Curabitur facilisis ut diam porta."

  }, {
    "status": true,
    "date": "02/02/2023",
    "title": "sol",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lectus vel sapien scelerisque tempus et sit amet sem. In mollis sodales enim vitae hendrerit. Ut malesuada interdum libero, et feugiat orci dictum egestas. Aenean tincidunt sem quis molestie feugiat. Proin suscipit erat non ante egestas, nec sollicitudin ipsum posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras id eros a augue feugiat eleifend. Fusce condimentum tempor justo, quis rutrum tortor malesuada quis." +

      "In dictum vehicula est sed lobortis. Vestibulum auctor nulla tellus, nec vehicula magna dapibus sed. Pellentesque risus velit, viverra at luctus eu, varius vitae eros. Suspendisse ac ante viverra, dignissim ex in, posuere mauris. Aenean non fringilla eros, quis posuere tellus. Pellentesque vulputate risus vel feugiat gravida. Duis et tristique urna. Morbi sit amet maximus felis. Nullam at massa id massa hendrerit gravida non quis nibh. Curabitur facilisis ut diam porta."

  }, {
    "status": false,
    "date": "02/02/2023",
    "title": "lluvia",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lectus vel sapien scelerisque tempus et sit amet sem. In mollis sodales enim vitae hendrerit. Ut malesuada interdum libero, et feugiat orci dictum egestas. Aenean tincidunt sem quis molestie feugiat. Proin suscipit erat non ante egestas, nec sollicitudin ipsum posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras id eros a augue feugiat eleifend. Fusce condimentum tempor justo, quis rutrum tortor malesuada quis." +

      "In dictum vehicula est sed lobortis. Vestibulum auctor nulla tellus, nec vehicula magna dapibus sed. Pellentesque risus velit, viverra at luctus eu, varius vitae eros. Suspendisse ac ante viverra, dignissim ex in, posuere mauris. Aenean non fringilla eros, quis posuere tellus. Pellentesque vulputate risus vel feugiat gravida. Duis et tristique urna. Morbi sit amet maximus felis. Nullam at massa id massa hendrerit gravida non quis nibh. Curabitur facilisis ut diam porta."

  }, {
    "status": true,
    "date": "02/02/2023",
    "title": "niebla",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lectus vel sapien scelerisque tempus et sit amet sem. In mollis sodales enim vitae hendrerit. Ut malesuada interdum libero, et feugiat orci dictum egestas. Aenean tincidunt sem quis molestie feugiat. Proin suscipit erat non ante egestas, nec sollicitudin ipsum posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras id eros a augue feugiat eleifend. Fusce condimentum tempor justo, quis rutrum tortor malesuada quis." +

      "In dictum vehicula est sed lobortis. Vestibulum auctor nulla tellus, nec vehicula magna dapibus sed. Pellentesque risus velit, viverra at luctus eu, varius vitae eros. Suspendisse ac ante viverra, dignissim ex in, posuere mauris. Aenean non fringilla eros, quis posuere tellus. Pellentesque vulputate risus vel feugiat gravida. Duis et tristique urna. Morbi sit amet maximus felis. Nullam at massa id massa hendrerit gravida non quis nibh. Curabitur facilisis ut diam porta."

  }, {
    "status": false,
    "date": "02/02/2023",
    "title": "tubo roto",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lectus vel sapien scelerisque tempus et sit amet sem. In mollis sodales enim vitae hendrerit. Ut malesuada interdum libero, et feugiat orci dictum egestas. Aenean tincidunt sem quis molestie feugiat. Proin suscipit erat non ante egestas, nec sollicitudin ipsum posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras id eros a augue feugiat eleifend. Fusce condimentum tempor justo, quis rutrum tortor malesuada quis." +

      "In dictum vehicula est sed lobortis. Vestibulum auctor nulla tellus, nec vehicula magna dapibus sed. Pellentesque risus velit, viverra at luctus eu, varius vitae eros. Suspendisse ac ante viverra, dignissim ex in, posuere mauris. Aenean non fringilla eros, quis posuere tellus. Pellentesque vulputate risus vel feugiat gravida. Duis et tristique urna. Morbi sit amet maximus felis. Nullam at massa id massa hendrerit gravida non quis nibh. Curabitur facilisis ut diam porta."

  },
  {
    "status": false,
    "date": "02/02/2023",
    "title": "tubo roto",
    "description": "w"
  },]


  useEffect(() => {
    incidentStore.getRequestIncident('Bolea', pageNumber, 5)
  }, [pageNumber])

  function showDescription(description: string) {
    setModal(true)
    incidentStore.updateDescription(description)
  }
  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    setPageNumber(pageNumber - 1)
  }
  return (
    <div className="w-full h-full  relative flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Incident</h2>
        </div>
        <div className="relative  w-full overflow-x-auto shadow-md sm:rounded-lg">
          <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <div className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
              <div className="flex md:w-1/3 w-full m-auto  p-1">
                <input
                  type="text"
                  name="photosSearch"
                  className=" mr-3 block md:w-3/4 px-4 py-2 text-purple-700 w-full bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <button onClick={() => {
                }}

                  name="photosSearchBtn" className="px-5 text-white bg-indigo-800 rounded-md shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 ">
                  <img  className="w-6 h-6" src={Search} alt="search"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <div>
          <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="w-1/2 h-1/2 flex flex-col">
              <button className="  text-blue-600  font-medium place-self-end bg-white rounded-full w-7 h-7 border-dark-purple border-2 mb-1 " onClick={() => setModal(false)}>X</button>
              <div className="w-full  max-h-96 rounded-md flex flex-wrap bg-gray-100 ">
                <p className="font-bold text-xl uppercase underline p-3 w-full text-center underline-offset-4 ">Descripción detallada</p>
                <div className="flex flex-wrap md:h-40 h-1/2 max-h-40 overflow-y-scroll border-t-2 border-b-2 p-2 w-full">
                  <p className="font-medium">{incidentStore.getDescription}</p>
                </div>
                <div className="flex w-full justify-center p-5">
                  <button className="inline-flex items-center rounded-md border 
         disabled:bg-gray-500 border-gray-300 bg-indigo-800
          px-4 py-3 text-sm font-medium text-gray-300 
          shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">Resolver</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : <></>}
      {/*para mantener responsivity hay que cambiar tamaño de ventanitas que muestra cuando esta en modo MD: pantalla de movil*/}
      <div className="w-full md:h-5/6 h-4/6  lg:p-3  p-5" >
        <div className="container h-full  mx-auto ">
          <div className="grid md:grid-cols-2 md:grid-rows-3 grid-cols-1 h-full" >
            {arrayIncindent.slice(0, 6).map((incident, index) => (
              <div key={index} id="divIndex" className=" relative flex flex-col m-1 border-2 rounded-md bg-gray-100 shadow-md" onClick={() => { showDescription(incident.description) }} >
                <div className=" flex flex-2">
                  <p className="font-semibold p-1 underline underline-offset-4">{incident.date}</p>
                </div>
                <div className="relative min-w-fit flex flex-1 flex-row m-auto md:items-center md:justify-center w-full">
                  <p className="font-bold text-xl uppercase underline ml-3 underline-offset-4">{incident.title}</p>
                  <img className="absolute right-1" src={incident.status ? resolved : error} alt="error"></img>
                </div>
                <div className="flex flex-1">
                  <p className="font-medium  leading-8 p-2 md:line-clamp-2 line-clamp-1">{incident.description}</p>
                </div>
                <div className="flex flex-1 w-full items-center justify-center ">
                  <p className="line-clamp-1 text-gray-700 font-medium hover:text-gray-500">Pulse para ver detalles</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button onClick={() => decrementPage()} disabled={pageNumber < 1}
          className="inline-flex disabled:bg-gray-500 w-fit items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" >
          <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
          Anterior
        </button>
        <button onClick={() => incrementPage()} disabled={pageNumber === incidentStore.getPaginatedIncident.totalPages!! - 1 || incidentStore.getPaginatedIncident.content?.length === 0}
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
export default observer(Incident)