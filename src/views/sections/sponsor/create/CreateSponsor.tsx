import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
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
  const [sponsorPhoto, setSponsorPhoto] = useState<string>("")
  const [sponsorTel, setSponsorTel] = useState<string>("")

function addSposor(){
  const sponsor : Sponsor ={
    title: sponsorTitle,
    description: sponsorDescription,
    phoneNumber: sponsorTel,
    //imageUrl: sponsorPhoto
  }
  sponsorStore.addRequestSponsor('Bolea', sponsor)
}

  //funcion temporal para comprobar entrada
  function checkState() {
    console.log(sponsorTitle)
    console.log(sponsorDescription)
    console.log(sponsorPhoto)
    console.log(sponsorTel)
  }
  return (
    <div className="flex flex-col md:m-auto w-full md:w-1/2 md:h-screen border-2 rounded-md">
      <div>
      <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
        <div className="w-full flex flex-row p-2 justify-between">
        <img src={logoEtno} alt="logo_Etno"></img>
          <p className='flex  text-white text-3xl p-3'>PATROCINADOR</p>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-5 pl-3">
        <div className="flex flex-col p-1 relative">
             <input autoFocus placeholder=" " name="sponsorTitle" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
                        border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(e) => {
            setSponsorTitle(e.currentTarget.value)
          }} onKeyUp={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (txtAreaRef.current != null) {
                txtAreaRef.current.focus()
              }
            }
          }} />
          <label className={"float-input-lbl"}>Título</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-3 pl-3">
        <div className="flex flex-col p-1 relative">
     
          <textarea ref={txtAreaRef} placeholder=" " name="sponsorDescription" rows={3} className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
                        border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(e) => {
            setSponsorDescription(e.currentTarget.value)
          }} onKeyUp={(e) => {
            if ((e.code === "NumpadEnter")) {
              if (inputRef.current != null) {
                inputRef.current.focus()
              }
            }
          }} />
               <label className={"float-txtArea-lbl"}>Descripción</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-3 pl-3 ">
        <div className="flex flex-col p-1 relative">

          <input ref={inputRef} placeholder=" " name="sponsorTel" type="text" onInput={(e) =>
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
            border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800 w-1/2" onChange={(e) => {
              setSponsorTel(e.currentTarget.value)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (btnRef.current != null) {
                  btnRef.current.focus()
                }
              }
            }} />
            <label className={"float-input-lbl"}>Teléfono</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-3 pl-3">
        <div className="text-left p-1 relative">
       
          <div className={"photoBoard"}>
            <div className='pl-3'>
              Foto
            </div>
            <form id="form-file-upload" className=" w-full flex justify-center">
              <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                setSponsorPhoto(e.currentTarget.value)
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
        <button name="sponsorBtnCancel" className="btnStandard" onClick={() => navigate("/home")}>Cancelar</button>
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default CreateSponsor