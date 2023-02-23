import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import "../../../../index.css"
import BandStore from '../../../../viewmodels/band/BandsStore';
import { Band } from "../../../../models/section/Section"
import { toast, ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';

const bandStore = BandStore.getBandStore()

const CreateBand = () => {

  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [bandType, setBandType] = useState<string>("")
  const [bandDescription, setBandDescription] = useState<string>("")
  const [bandPhoto, setBandPhoto] = useState<string>("")
  const [bandDate, setbandDate] = useState<string>("")
  const [file, setFile] = useState<File>()

  function addBand() {
    const bando: Band = {
      title: bandType,
      description: bandDescription,
      issuedDate: bandDate,
      // imageUrl:bandPhoto 
    }
    if (bandStore.getBand.title === bando.title) {
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
      bandType === "" || bandDescription === "" || bandDate === "" || file === undefined ?
        toast.info('Rellene los campos', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        }) : bandStore.addRequestBand('Bolea', bando, file!!)
    }
  }

  return (
    <div className="flex flex-col md:m-auto w-full md:w-1/2 md:h-screen border-2 rounded-md">
      <div>
        <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
          <div className="w-full flex flex-row p-2 justify-between">
            <img src={logoEtno} alt="logo_Etno"></img>
            <p className='flex  text-white text-3xl p-3'>BANDOS</p>
          </div>
        </div>

        <div className="w-full flex flex-1 flex-col pl-3">
          <div className=" flex flex-col p-1 mt-5  relative">
            <input autoFocus placeholder=" "
              name="bandType" type="text" required={true}
              className="inputCamp peer" onChange={(value) => {
                setBandType(value.currentTarget.value)
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
            <textarea ref={txtAreaRef} placeholder="  " name="bandDescription" rows={3}
              className="inputCamp peer"
              onChange={(value) => {
                setBandDescription(value.currentTarget.value)

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
        <div className="w-full flex flex-1 flex-col pl-3 mt-5">
          <div className="flex flex-col p-1 relative ">
            <input ref={inputRef} placeholder=" dsdsdsd" type="date" name="bandDate"
               className="inputCamp peer w-40"
              onChange={(value) => {
                setbandDate(value.currentTarget.value)
              }} onKeyDown={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (btnRef.current != null) {
                    btnRef.current.focus()
                  }
                }
              }} />
            <label className={"labelFloatDate"}>Fecha</label>
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
          <button ref={btnRef} name="bandBtnSave" className="btnStandard mr-10" onClick={addBand}>Publicar</button>
          <button name="bandBtnCancel" className="btnStandard" onClick={() => navigate("/home")}>Cancelar</button>
        </div>
      </div>
      <ToastContainer style={{ margin: "30px" }} />
    </div>
  )
}
export default observer(CreateBand)