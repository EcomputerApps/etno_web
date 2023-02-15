import logoEtno from '../../../../assets/logo_etno.png'
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import Buttons from '../../../../components/section/buttons'

const CreateNecrologue = () => {
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [necroName, setNecroName] = useState<string>("0")
  const [necroDate, setNecroDate] = useState<string>("1")
  const [necroDescription, setNecroDescription] = useState<string>("2")
  const [necroPhoto, setNecroPhoto] = useState<string>("8")

  //funcion temporal para comprobar  datos  que guardamos con consol.log
  function checkState() {
    console.log(necroName)
    console.log(necroDate)
    console.log(necroDescription)
    console.log(necroPhoto)

  }

  return (
    <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2 h-screen rounded-md" >
      <div>
      <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
        <div className="w-full flex flex-row p-2 justify-between">
        <img src={logoEtno} alt="logo_Etno"></img>
          <p className='flex  text-white text-3xl p-3'>FALLECIMIENTO</p>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-5 pl-3">
        <div className="flex flex-col p-1 relative">
       
          <input autoFocus placeholder=" " name="necroName" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
            setNecroName(value.currentTarget.value)
          }} onKeyUp={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (inputRef.current != null) {
                inputRef.current.focus()
              }
            }
          }}></input>
          <label className={"float-input-lbl"}>Nombre</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-5 pl-3">
        <div className="flex flex-col p-1 relative">

          <input ref={inputRef} type="date" name="necroDate" className=" w-40 autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
            setNecroDate(value.currentTarget.value)
          }} onKeyUp={(e) => {
            if ((e.code === "NumpadEnter")) {
              if (txtAreaRef.current != null) {
                txtAreaRef.current.focus()
              }
            }
          }} />
          <label className={"float-date-lbl"}>Fecha de fallecimiento</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-3 pl-3">
        <div className="flex flex-col  p-1 relative">

          <textarea ref={txtAreaRef} placeholder=" " name="eventDescription" rows={3} className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
            setNecroDescription(value.currentTarget.value)
          }} onKeyDown={(e) => {
            if (e.code === "NumpadEnter") {
              if (btnRef.current != null) {
                btnRef.current.focus()
              }
            }
          }} /><label className={"float-txtArea-lbl"}>Descripción</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-3 pl-3">
        <div className="text-left p-1 relative">
     
          <div className={"photoBoard"}>
            <div className='pl-3'>
              Foto
            </div>
            <form id="form-file-upload" className=" w-full flex justify-center">
              <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                setNecroPhoto(value.currentTarget.value)
              }} />
              <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                <div className="flex m-auto flex-col items-center font-normal text-gray-400 text-xl">
           <img src={add_Photo} alt="add_photo"/>
                  <p>Pulse en la zona para añadir una imagen</p>
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>
      </div>
      <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
        <button ref={btnRef} name="pharmacyBtnSave" className={"post-btn"} onClick={() => {
          checkState()
        }}>Publicar</button>
        <button name="pharmacyBtnCancel" className={"regular-btn"} onClick={() => navigate("/home")}>Cancelar</button>
      </div>
    </div>
  )
}
export default CreateNecrologue