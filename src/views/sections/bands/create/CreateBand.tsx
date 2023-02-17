import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import "../../../../index.css"
import BandStore from '../../../../viewmodels/band/BandsStore';
import { Band } from "../../../../models/section/Section"

const bandStore = BandStore.getBandStore()

const CreateBand = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [bandType, setBandType] = useState<string>("")
  const [emptyType, setEmptyType] = useState<boolean>(false)
  const [bandDescription, setBandDescription] = useState<string>("")
  const [emptyDescription, setEmptyDescription] = useState<boolean>(false)
  const [bandPhoto, setBandPhoto] = useState<string>("")
  const [emptyPhoto, setEmptyPhoto] = useState<boolean>(false)
  const [bandDate, setbandDate] = useState<string>("")
  const [emptyDate, setEmptyDate] = useState<boolean>(false)


  function addBand() {
    const bando: Band = {
      title: bandType,
      description: bandDescription,
      issuedDate: bandDate,
      // imageUrl:bandPhoto 
    }
    bandStore.addRequestBand('Bolea', bando)

  }

  function checkState() {
    var validate = true
    console.log(bandType)
    console.log(bandDescription)
    console.log(bandPhoto)
    console.log(bandDate)
    if (bandType === "") {
      setEmptyType(true)
      validate = false
    } else setEmptyType(false)
    if (bandDescription === "") {
      setEmptyDescription(true)
      validate = false
    } else setEmptyDescription(false)
    if (bandDate === "") {
      setEmptyDate(true)
      validate = false
    } else setEmptyDate(false)
    if (bandPhoto === "") {
      setEmptyPhoto(true)
      validate = false
    } else setEmptyPhoto(false)
    if (validate) {
      navigate("/home")
    }


  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      console.log(e.currentTarget.id)
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
            <input autoFocus placeholder=" " name="bandType" id="test" type="text" required={true}
              className={`autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] block border-2 
          rounded-md p-2 w-full peer focus:outline-none focus:border-indigo-800 ${emptyType ? "border-red-600" : ""}`} onChange={(value) => {
                setBandType(value.currentTarget.value)

              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (txtAreaRef.current != null) {
                    txtAreaRef.current.focus()
                  }
                }
              }} />
            <label className="float-input-lbl">Asunto</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3 mt-3">
          <div className="flex flex-col p-1  relative">
            <textarea ref={txtAreaRef} placeholder="  " name="bandDescription" rows={3}
              className={`autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800 ${emptyDescription ? "border-red-600" : ""}`}
              onChange={(value) => {
                setBandDescription(value.currentTarget.value)

              }} onKeyDown={(e) => {
                if (e.code === "NumpadEnter") {
                  if (inputRef.current != null) {
                    inputRef.current.focus()
                  }
                }
              }}></textarea>
            <label className={"float-txtArea-lbl"}>Descripcíon</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3 mt-5">
          <div className="flex flex-col p-1 relative  ">
            <input ref={inputRef} placeholder=" dsdsdsd" type="date" name="bandDate"
              className={`w-40 border-2 rounded-md peer focus:outline-none focus:border-indigo-800 ${emptyDate ? "border-red-600" : ""} `}
              onChange={(value) => {
                setbandDate(value.currentTarget.value)
              }} onKeyDown={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (btnRef.current != null) {
                    btnRef.current.focus()
                  }
                }
              }} />
            <label className={"float-date-lbl"}>Fecha</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="text-left p-1 ">
            <div className={`photoBoard ${emptyPhoto ? "border-red-600" : ""} `}>
              <div className='absolute left-2'>
                Fotos
              </div>
              <form id="form-file-upload" className=" w-full flex justify-center ">
                <input type="file" id="input-file-upload" className={`visibility: hidden ${emptyPhoto ? "border-red-600" : ""}`} size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                  setBandPhoto(value.currentTarget.value)
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
        <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
          <button ref={btnRef} name="bandBtnSave" className="btnStandard mr-10" onClick={() => { addBand() }}>Publicar</button>
          <button name="bandBtnCancel" className="btnStandard" onClick={() => navigate("/home")}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default CreateBand