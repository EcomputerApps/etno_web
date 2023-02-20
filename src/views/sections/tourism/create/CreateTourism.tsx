import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import { Tourism } from "../../../../models/section/Section"

import TourismStore from "../../../../viewmodels/tourism/TourismStore"
const tourismStore = TourismStore.getTourismStore()

const CreateTourism = () => {
  const navigate = useNavigate()

  const inputTitle = useRef<HTMLInputElement>(null)
  const inputLong = useRef<HTMLInputElement>(null)
  const inputLat = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [tourismType, setTourismType] = useState<string>("")
  const [tourismTitle, setTourismTitle] = useState<string>("")
  const [tourismDescription, setTourismDescription] = useState<string>("")
  const [tourismPhoto, setTourismPhoto] = useState<string>("")
  const [tourismLong, setTourismLong] = useState<string>("")
  const [tourismLat, setTourismLat] = useState<string>("")

  //funcion temporal para comprobar entrada
  function addTourism() {
      const tourism: Tourism = {
        type: tourismType,
        title: tourismTitle,
        description: tourismDescription,
        longitude: tourismLong,
        latitude: tourismLat
      }
      if(tourismStore.getTourism.title === tourism.title){
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
        tourismType === '' || tourism.title === '' || tourism.description === '' || tourismLong === '' || tourismLat === '' ? 
        toast.info('Rellene los campos vacíos', {
          position: 'top-center',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light'
        }) : tourismStore.addRequestTourism('Bolea', tourism)
      }
  }

  return (
    <div className="flex flex-col md:m-auto w-full md:w-1/2 md:h-screen border-2 rounded-md">
      <div>
      <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
        <div className="w-full flex flex-row p-2 justify-between">
          <img src={logoEtno} alt="logo_Etno"></img>
          <p className='flex  text-white text-3xl p-3'>TURISMO</p>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-5 pl-3">
        <div className="flex flex-col p-1 relative">
          <input autoFocus placeholder=" " name="tourismType" type="text" className="inputCamp peer" onChange={(e) => {
            setTourismType(e.currentTarget.value)
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
          <input ref={inputTitle} placeholder=" " name="tourismTitle" type="text" className="inputCamp peer" onKeyUp={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (txtAreaRef.current != null) {
                txtAreaRef.current.focus()
              }
            }
          }} onChange={(e) => {
            setTourismTitle(e.currentTarget.value)
          }} />
          <label className="labelFloatInput">Título</label>
        </div>
      </div >
      <div className="w-full flex flex-1 flex-col mt-3 pl-3">
        <div className="flex flex-col p-1 relative">
          <textarea ref={txtAreaRef} placeholder=" " name="tourismDescription" rows={3} className="inputCamp peer" onKeyUp={(e) => {
            if ((e.code === "NumpadEnter")) {
              if (inputLong.current != null) {
                inputLong.current.focus()
              }
            }
          }} onChange={(e) => {
            setTourismDescription(e.currentTarget.value)
          }} />
          <label className={"labelFloatTxtArea"}>Descripcíon</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="text-left p-1">
          <div className={"photoBoard"}>
            <div className='absolute left-2'>
              Fotos
            </div>
            <form id="form-file-upload" className=" w-full flex justify-center">
              <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                setTourismPhoto(e.currentTarget.value)
              }} />
              <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                  <img src={add_Photo} alt="add_photo"/>
                  <p>Pulse en la zona para añadir una imagen</p>
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>
     
      <div className="w-full flex flex-1 flex-col mt-3 pl-3">
        <div className="flex flex-col p-1 relative">

          <input ref={inputLong} placeholder=" " type="text" name="tourismLong" className="inputCamp peer" onKeyUp={(e) => {
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
          <input ref={inputLat} placeholder=" " type="text" name="tourismLat" className="inputCamp peer" onKeyUp={(e) => {
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
      <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">

        <button ref={btnRef} name="tourismBtnSave" className="btnStandard mr-10" onClick={addTourism}>Publicar</button>
        <button name="tourismBtnCancel" className="btnStandard" onClick={() => navigate("/home")}>Cancelar</button>
      </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
export default CreateTourism