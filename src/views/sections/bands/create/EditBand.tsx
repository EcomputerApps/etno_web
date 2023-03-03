import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import "../../../../index.css"
import BandStore from '../../../../viewmodels/band/BandsStore';
import { Band } from "../../../../models/section/Section"
import { toast, ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

const bandStore = BandStore.getBandStore()

const EditBand = () => {
  const [band, setBand] = useState(bandStore.getBand)

  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [bandType, setBandType] = useState<string>(band.title!!)
  const [bandDescription, setBandDescription] = useState<string>(band.description!!)
  const [file, setFile] = useState<File>()


  function updateBand(bandId: string) {
    chekIfEmpty()
    if (bandType === "" || bandDescription === "") {
      toast.error('Rellene los campos', {
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
      const bando: Band = {
        title: bandType,
        description: bandDescription,
        imageUrl: band.imageUrl

      }

      bandStore.editBand('Bolea', bandId, bando, file!!)
     // bandStore.getRequestBand('Bolea', 0, 5)
     sideBarStore.updateSection('Bandos'); hoverSectionStore.setName('Bandos')
    }
  }
  function chekIfEmpty() {
    bandType === "" ? setEmptyType(true) : setEmptyType(false)
    bandDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)

  }
  const [emptyType, setEmptyType] = useState(false)
  const [emptyDescription, setEmptyDescription] = useState(false)

  return (
    <div className="flex flex-col md:m-auto w-full md:h-screen border-2 rounded-md bg-white">
      <div>
        <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
          <div className="w-full flex flex-row p-2 justify-between">
            <img src={logoEtno} alt="logo_Etno"></img>
            <p className='flex  text-white text-3xl p-3'>EDITAR BANDO</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className=" flex flex-col p-1 mt-5  relative">
            <input autoFocus placeholder=" " defaultValue={band.title}
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
                }} />
            <label className="labelFloatInput">Asunto</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3 mt-3">
          <div className="flex flex-col p-1  relative">
            <textarea ref={txtAreaRef} placeholder="  " defaultValue={band.description} name="bandDescription" rows={3}
              className={`inputCamp peer ${emptyDescription ? 'border-red-600'
                : ''
                }`}
              onChange={(value) => {
                setBandDescription(value.currentTarget.value)
                setEmptyDescription(false)
              }} onKeyDown={(e) => {
                if (e.code === "NumpadEnter") {
                  if (inputRef.current != null) {
                    inputRef.current.focus()
                  }
                }
              }}></textarea>
            <label className={"labelFloatTxtArea"}>Descripcíon</label>
          </div>
        </div>

        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="text-left p-1 ">
            <div className="photoBoard" >
              <div className='absolute left-2'>
                Foto {file?.name}
              </div>
              <form id="form-file-upload" className=" w-full flex justify-center ">
                <input type="file" id="input-file-upload" className="visibility: hidden" max={1} size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                  setFile(value.currentTarget.files!![0])
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
          <button ref={btnRef} name="bandBtnSave" className="btnStandard mr-10" onClick={() => updateBand(band.idBando!!)}>Actualizar</button>
          <button name="bandBtnCancel" className="btnStandard" onClick={() => bandStore.setModalEdit(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default observer(EditBand)