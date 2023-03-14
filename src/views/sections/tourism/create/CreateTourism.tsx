import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import { Tourism } from "../../../../models/section/Section"
import GoogleMapReact from 'google-map-react';

import TourismStore from "../../../../viewmodels/tourism/TourismStore"
import markerIcon from "../../../../assets/marker.svg"
import HoverSectionStore from "../../../../viewmodels/hoverSection/HoverSectionStore"
import SideBarStore from "../../../../viewmodels/sidebar/SideBarStore"
const tourismStore = TourismStore.getTourismStore()
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

interface Marker {
  lat: number,
  lng: number,
  text: string
}

const CreateTourism = () => {

  const defaultProps = {
    center: {
      lat: 42.13775899999999,
      lng: -0.40838200000000713
    },
    zoom: 11
  };


  const navigate = useNavigate()

  const inputTitle = useRef<HTMLInputElement>(null)
  const inputLong = useRef<HTMLInputElement>(null)
  const inputLat = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  const [tourismType, setTourismType] = useState<string>("")
  const [tourismTitle, setTourismTitle] = useState<string>("")
  const [tourismDescription, setTourismDescription] = useState<string>("")
  const [tourismPhoto, setTourismPhoto] = useState<string>("")
  const [tourismLong, setTourismLong] = useState<string>("")
  const [tourismLat, setTourismLat] = useState<string>("")
  const [file, setFile] = useState<File>()

  const AnyReactComponent = (props: Marker) => <img style={{ width: '200', height: '200' }} src={props.text}></img>;


  function addTourism() {
    const tourism: Tourism = {
      type: tourismType,
      title: tourismTitle,
      description: tourismDescription,
      longitude: String(long),
      latitude: String(lat)
    }
    if (tourismStore.getTourism.title === tourism.title) {
      toast.info('Ya existe este turismo', {
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
      checkIfEmpty()
      tourismType === '' || tourism.title === '' || tourism.description === '' || long === 0 || lat === 0 || file === undefined ?
        toast.info('Rellene los campos vacíos', {
          position: 'top-center',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light'
        }) : tourismStore.addRequestTourism('Bolea', tourism, file!!); sideBarStore.updateSection('Turismo'); hoverSectionStore.setName('Turismo')
    }
  }
  function checkIfEmpty() {
    tourismType === "" ? setEmptyType(true) : setEmptyType(false)
    tourismTitle === "" ? setEmptyTitle(true) : setEmptyTitle(false)
    tourismDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
    file === undefined ? setEmptyFile(true) : setEmptyFile(false)
    lat === 0 ? setEmptyLongLat(true) : setEmptyLongLat(false)
    long === 0 ? setEmptyLongLat(true) : setEmptyLongLat(false)


  }
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [emptyType, setEmptyType] = useState(false)
  const [emptyDescription, setEmptyDescription] = useState(false)
  const [emptyFile, setEmptyFile] = useState(false)
  const [emptyLongLat, setEmptyLongLat] = useState(false)

  return (
    <div className="flex flex-col lg:m-auto  lg:w-1/2 w-11/12 h-screen overflow-y-auto border-2 rounded-md bg-white">
      <div>
        <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
          <div className="w-full flex flex-row p-2 justify-between">
            <img src={logoEtno} alt="logo_Etno"></img>
            <p className='flex  text-white lg:text-3xl text-2xl  p-3'>CREAR TURISMO</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-5 pl-3">
          <div className="flex flex-col p-1 relative">
            <input autoFocus placeholder=" " name="tourismType" type="text" className={`inputCamp peer ${emptyType ? 'border-red-600'
              : ''
              }`} onChange={(e) => {
                setTourismType(e.currentTarget.value)
                setEmptyType(false)
              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputTitle.current != null) {
                    inputTitle.current.focus()
                  }
                }
              }} />
            <label className={"labelFloatInput"}>Tipo</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">
            <input ref={inputTitle} placeholder=" " name="tourismTitle" type="text" className={`inputCamp peer ${emptyTitle ? 'border-red-600'
              : ''
              }`} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (txtAreaRef.current != null) {
                    txtAreaRef.current.focus()
                  }
                }
              }} onChange={(e) => {
                setTourismTitle(e.currentTarget.value)
                setEmptyTitle(false)
              }} />
            <label className="labelFloatInput">Título</label>
          </div>
        </div >
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">
            <textarea ref={txtAreaRef} placeholder=" " name="tourismDescription" rows={3} className={`inputCamp peer ${emptyDescription ? 'border-red-600'
              : ''
              }`} onKeyUp={(e) => {
                if ((e.code === "NumpadEnter")) {
                  if (inputLong.current != null) {
                    inputLong.current.focus()
                  }
                }
              }} onChange={(e) => {
                setTourismDescription(e.currentTarget.value)
                setEmptyDescription(false)
              }} />
            <label className={"labelFloatTxtArea"}>Descripcíon</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="text-left p-1">
            <div className={`photoBoard  ${emptyFile ? 'border-red-600'
              : ''
              }`}>
              <div className='absolute left-2'>
                Fotos {file?.name}
              </div>
              <form id="form-file-upload" className=" w-full flex justify-center ">
                <input type="file" id="input-file-upload" className="visibility: hidden" max={1} size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                  setFile(value.currentTarget.files!![0])
                  setEmptyFile(false)
                }} />
                <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                  <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                    <img src={add_Photo} alt="add_photo" />
                    <p>Pulse en la zona para añadir una imagen</p>
                  </div>
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className={`border-2 rounded-md m-1 ${emptyLongLat ? 'border-red-600'
            : ''
            }`}>
            <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyByVAayqkxKFNRi1QiNqua1jRCREORO7S0" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onClick={(e) => {
                  setLat(e.lat)
                  setLong(e.lng)
                  setEmptyLongLat(false)
                }}

              >
                <AnyReactComponent
                  lat={lat}
                  lng={long}
                  text={markerIcon}
                />
              </GoogleMapReact>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">

            <input value={long} ref={inputLong} placeholder=" " type="text" disabled name="tourismLong" className="inputCamp peer" onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputLat.current != null) {
                  inputLat.current.focus()
                }
              }
            }} onChange={(e) => {
              setTourismLong(e.currentTarget.value)
            }} />
            <label className={"labelFloatInput"}>Longitud</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">
            <input value={lat} ref={inputLat} placeholder=" " type="text" disabled name="tourismLat" className="inputCamp peer" onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (btnRef.current != null) {
                  btnRef.current.focus()
                }
              }
            }} onChange={(e) => {
              setTourismLat(e.currentTarget.value)
            }} />
            <label className={"labelFloatInput"}>Latitud</label>
          </div>
        </div>
        <div className="  flex m-auto justify-center left-0 right-0 p-3 bottom-1">

          <button ref={btnRef} name="tourismBtnSave" className="btnStandard mr-10" onClick={addTourism}>Publicar</button>
          <button name="tourismBtnCancel" className="btnStandard" onClick={() => tourismStore.setModalCreate(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default CreateTourism