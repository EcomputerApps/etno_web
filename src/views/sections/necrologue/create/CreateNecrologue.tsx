import logoEtno from '../../../../assets/logo_etno.png'
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import NecrologueStore from '../../../../viewmodels/necrologue/NecrologueStore'
import { Necrologue } from '../../../../models/section/Section'
import { toast, ToastContainer } from 'react-toastify'
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore'
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore'
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

const necroStore = NecrologueStore.getNecrologueStore()

const CreateNecrologue = () => {
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [necroName, setNecroName] = useState<string>("")
  const [necroDate, setNecroDate] = useState<string>("")
  const [necroDescription, setNecroDescription] = useState<string>("")
  const [file, setFile] = useState<File>()

  function addNecrologue() {
    const necro: Necrologue = {
      name: necroName,
      deathDate: necroDate,
      description: necroDescription,

    }
    if (necroStore.getNecro.name === necro.name) {
      toast.info('Ya existe este servicio', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
      })
    } else {
      chekIfEmpty()
      necroName === "" || necroDate === "" || necroDescription === "" || file === undefined ?
        toast.info('Rellene todos los campos', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        }) : necroStore.addRequestNecro('Bolea', necro, file!!); sideBarStore.updateSection('Fallecimientos'); hoverSectionStore.setName('Fallecimientos')
    }
  }

  function chekIfEmpty() {
    necroName === "" ? setEmptyName(true) : setEmptyName(false)
    necroDate === "" ? setEmptyDate(true) : setEmptyDate(false)
    necroDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
    file === undefined ? setEmptyFile(true) : setEmptyFile(false)
  }

  const [emptyName, setEmptyName] = useState(false)
  const [emptyDate, setEmptyDate] = useState(false)
  const [emptyDescption, setEmptyDescription] = useState(false)
  const [emptyFile, setEmptyFile] = useState(false)

  return (
    <div className="flex flex-col h-screen w-1/2 border-2 rounded-md overflow-y-auto bg-white" >
      <div>
        <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
          <div className="w-full flex flex-row p-2 justify-between">
            <img src={logoEtno} alt="logo_Etno"></img>
            <p className='flex  text-white text-3xl p-3'>FALLECIMIENTO</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-5 pl-3">
          <div className="flex flex-col p-1 relative">

            <input autoFocus placeholder=" " name="necroName" type="text" className={`inputCamp peer ${emptyName ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNecroName(value.currentTarget.value)
                setEmptyName(false)
              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputRef.current != null) {
                    inputRef.current.focus()
                  }
                }
              }}></input>
            <label className={"labelFloatInput"}>Nombre</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-5 pl-3">
          <div className="flex flex-col p-1 relative">

            <input ref={inputRef} type="date" name="necroDate" className={`inputCamp peer w-40 ${emptyDate ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNecroDate(value.currentTarget.value)
                setEmptyDate(false)
              }} onKeyUp={(e) => {
                if ((e.code === "NumpadEnter")) {
                  if (txtAreaRef.current != null) {
                    txtAreaRef.current.focus()
                  }
                }
              }} />
            <label className={"labelFloatDate"}>Fecha de fallecimiento</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col  p-1 relative">

            <textarea ref={txtAreaRef} placeholder=" " name="eventDescription" rows={3} className={`inputCamp peer ${emptyDescption ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNecroDescription(value.currentTarget.value)
                setEmptyDescription(false)
              }} onKeyDown={(e) => {
                if (e.code === "NumpadEnter") {
                  if (btnRef.current != null) {
                    btnRef.current.focus()
                  }
                }
              }} /><label className={"labelFloatTxtArea"}>Descripción</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="text-left p-1 relative">

            <div className={`photoBoard  ${emptyFile ? 'border-red-600'
              : ''
              }`}>
              <div className='pl-3'>
                Foto {file?.name}
              </div>
              <form id="form-file-upload" className=" w-full flex justify-center">
                <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                  setFile(value.currentTarget.files!![0])
                  setEmptyFile(false)
                }} />
                <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                  <div className="flex m-auto flex-col items-center font-normal text-gray-400 text-xl">
                    <img src={add_Photo} alt="add_photo" />
                    <p>Pulse en la zona para añadir una imagen</p>
                  </div>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
        <button ref={btnRef} name="pharmacyBtnSave" className="btnStandard mr-10" onClick={() => {
          addNecrologue()
        }}>Publicar</button>
        <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => necroStore.setModalCreate(false)}>Cancelar</button>
      </div>
      <ToastContainer style={{ margin: "50px" }} />
    </div>
  )
}
export default CreateNecrologue