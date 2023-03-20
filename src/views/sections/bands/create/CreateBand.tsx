import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import { useState, useRef, useEffect } from "react";
import "../../../../index.css"
import BandStore from '../../../../viewmodels/band/BandsStore';
import { Band } from "../../../../models/section/Section"
import { toast} from 'react-toastify';
import { observer } from 'mobx-react-lite';
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const bandStore = BandStore.getBandStore()

const CreateBand = () => {

  useEffect(() => {
    bandStore.getAllBandRequest("Bolea")
  }, [])

  function chekIfEmpty() {
    bandType === "" ? setEmptyType(true) : setEmptyType(false)
    bandDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
    file === undefined ? setEmptyFile(true) : setEmptyFile(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [emptyType, setEmptyType] = useState<boolean>(false)
  const [emptyDescription, setEmptyDescription] = useState<boolean>(false)
  const [emptyFile, setEmptyFile] = useState<boolean>(false)
   const [bandType, setBandType] = useState<string>("")
  const [bandDescription, setBandDescription] = useState<string>("")
  const [file, setFile] = useState<File>()
  const [flag, setFlag] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)

  function addBand() {
    const bando: Band = {
      title: bandType,
      description: bandDescription,
    }
    bandStore.getAllBands.bandos?.map((item) => {
      if (item.title === bando.title)
        setFlag(true)
    })
    if (flag) {
      toast.info('Ya existe este bando', {
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
      bandType === "" || bandDescription === "" || file === undefined ?
        toast.error('Rellene los campos', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        }) : bandStore.addRequestBand('Bolea', bando, file!!); sideBarStore.updateSection('Bandos'); hoverSectionStore.setName('Bandos')
    }
  }

  return (
    <div className="flex flex-col lg:m-auto lg:w-1/2  w-11/12 lg:h-screen border-2 rounded-md bg-white">
      {confirm ? (
        <div>
          <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="fixed inset-0 w-screen h-screen">
              <div className=" flex justify-center mt-10 ">
                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                  <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                  <div className="flex justify-center m-auto mt-5 mb-3">
                    <button className="btnStandard w-14 h-10 mr-5 " onClick={() => bandStore.setModalCreate(false)}>SI</button>
                    <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : <></>}
      <div>
        <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
          <div className="w-full flex flex-row p-2 justify-between">
            <img src={logoEtno} alt="logo_Etno"></img>
            <p className='flex  text-white lg:text-3xl text-2xl p-3'>CREAR BANDO</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className=" flex flex-col p-1 mt-5  relative">
            <input autoFocus placeholder=" "
              name="bandType" type="text" required={true}
              className={`inputCamp peer ${emptyType ? 'border-red-600'
                : ''
                }`} onChange={(value) => {
                  setBandType(value.currentTarget.value)
                  setEmptyType(false)
                }} onKeyUp={(e) => {
                  if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                    if (txtAreaRef.current != null) {
                      txtAreaRef.current.focus()
                    }
                  }
                }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}/>
            <label className="labelFloatInput">Asunto</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3 mt-3">
          <div className="flex flex-col p-1  relative">
            <textarea ref={txtAreaRef} placeholder="  " name="bandDescription" rows={3}
              className={`inputCamp peer ${emptyDescription ? 'border-red-600'
                : ''
                }`}
              onChange={(value) => {
                setEmptyDescription(false)
                setBandDescription(value.currentTarget.value)
              }} onKeyDown={(e) => {
                if (e.code === "NumpadEnter") {
                  if (inputRef.current != null) {
                    inputRef.current.focus()
                  }
                }
              }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}/>
            <label className={"labelFloatTxtArea"}>Descripcíon</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="text-left p-1 ">
            <div className={`photoBoard peer ${emptyFile ? 'border-red-600'
              : ''}`} >
              <div className='absolute left-2'>
                Foto {file?.name}
              </div>
              <form id="form-file-upload" className=" w-full flex justify-center ">
                <input type="file" id="input-file-upload" className="visibility: hidden" max={1} size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                  setFile(value.currentTarget.files!![0])
                  setEmptyFile(false)
                }} />
                <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                  <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                    <img src={add_Photo} alt="photo"></img>
                    <p>Pulse en la zona para añadir una imagen</p>
                  </div>
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className="md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
          <button ref={btnRef} name="bandBtnSave" className="btnStandard mr-10" onClick={addBand}>Publicar</button>
          <button name="bandBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default observer(CreateBand)