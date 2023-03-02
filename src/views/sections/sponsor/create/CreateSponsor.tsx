import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import { Sponsor } from '../../../../models/section/Section';
import SposnsorStore from '../../../../viewmodels/sponsor/SponsorStore';

const sponsorStore = SposnsorStore.getSponsorStore()
const CreateSponsor = () => {
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [sponsorTitle, setSponsorTitle] = useState<string>("")
  const [sponsorDescription, setSponsorDescription] = useState<string>("")
  const [sponsorTel, setSponsorTel] = useState<string>("")
  const [file, setFile] = useState<File>()

  function addSposor() {
    const sponsor: Sponsor = {
      title: sponsorTitle,
      description: sponsorDescription,
      phone: sponsorTel

    }
    if (sponsorStore.getSponsor.title === sponsor.title) {
      toast.info('Ya existe este patrocinador', {
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
      sponsorTitle === "" || sponsorDescription === "" || sponsorTel === "" || file === undefined
        ?
                toast.info('Rellene los campos', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        }) : sponsorStore.addRequestSponsor('Bolea', sponsor, file!!)
    }

  }

  function chekIfEmpty() {
    sponsorTitle === "" ? setEmptyName(true) : setEmptyName(false)
    file === undefined ? setEmptyFile(true) : setEmptyFile(false)
    sponsorTel === "" ? setEmptyTel(true) : setEmptyTel(false)
    sponsorDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)

  }

  const [emptyName, setEmptyName] = useState(false)
  const [emptyFile, setEmptyFile] = useState(false)
  const [emptyTel, setEmptyTel] = useState(false)
  const [emptyDescption, setEmptyDescription] = useState(false)
  
  return (
    <div className="flex flex-col h-screen w-1/2 border-2 rounded-md overflow-y-auto bg-white" >
      <div>
        <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
          <div className="w-full flex flex-row p-2 justify-between">
            <img src={logoEtno} alt="logo_Etno"></img>
            <p className='flex  text-white text-3xl p-3'>CREAR PATROCINADOR</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-5 pl-3">
          <div className="flex flex-col p-1 relative">
            <input autoFocus placeholder=" " name="sponsorTitle" type="text" className={`inputCamp peer ${emptyName ? 'border-red-600'
                            : ''
                            }`} onChange={(e) => {
              setSponsorTitle(e.currentTarget.value)
              setEmptyName(false)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (txtAreaRef.current != null) {
                  txtAreaRef.current.focus()
                }
              }
            }} />
            <label className={"labelFloatInput"}>Título</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">

            <textarea ref={txtAreaRef} placeholder=" " name="sponsorDescription" rows={3} className={`inputCamp peer ${emptyDescption ? 'border-red-600'
                            : ''
                            }`} onChange={(e) => {
              setSponsorDescription(e.currentTarget.value)
              setEmptyDescription(false)
            }} onKeyUp={(e) => {
              if ((e.code === "NumpadEnter")) {
                if (inputRef.current != null) {
                  inputRef.current.focus()
                }
              }
            }} />
            <label className={"labelFloatTxtArea"}>Descripción</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3 ">
          <div className="flex flex-col p-1 relative">

            <input ref={inputRef} placeholder=" " name="sponsorTel" type="text" onInput={(e) =>
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} className={`inputCamp peer w-1/4 ${emptyTel ? 'border-red-600'
              : ''
              }`} maxLength={9} onChange={(e) => {
                setSponsorTel(e.currentTarget.value)
                setEmptyTel(false)
              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (btnRef.current != null) {
                    btnRef.current.focus()
                  }
                }
              }} />
            <label className={"labelFloatInput"}>Teléfono</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="text-left p-1 relative">

            <div className={`photoBoard peer ${emptyFile ? 'border-red-600'
                            : ''
                            }`}>
              <div className='pl-3'>
                Foto {file?.name}
              </div>
              <form id="form-file-upload" className=" w-full flex justify-center">
                <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                  setFile(e.currentTarget.files!![0])
                  setEmptyFile(false)
                }} />
                <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                  <div className="flex m-auto flex-col items-center font-normal text-gray-400 text-xl">
                    <img src={add_Photo} alt="add_photo"></img>
                    <p>Pulse en la zona para añadir una imagen</p>
                  </div>
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">

          <button ref={btnRef} name="sponsorBtnSave" className="btnStandard mr-10" onClick={() => {
            addSposor()
          }}>Publicar</button>
          <button name="sponsorBtnCancel" className="btnStandard" onClick={() => sponsorStore.setModalCreate(false)}>Cancelar</button>
        </div>
      </div>

    </div>
  )
}

export default CreateSponsor