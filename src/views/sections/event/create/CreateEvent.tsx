import logoEtno from '../../../../assets/logo_etno.png'
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"

import { useNavigate } from "react-router-dom";
import { Event } from '../../../../models/section/Section';

import EventStore from '../../../../viewmodels/Event/EventStore';
const eventStore = EventStore.getEventStore()

const CreateEvent = () => {
  const inputRefDir = useRef<HTMLInputElement>(null)
  const inputRefOrg = useRef<HTMLInputElement>(null)
  const inputRefPric = useRef<HTMLInputElement>(null)
  const inputRefSeat = useRef<HTMLInputElement>(null)
  const inputRefLink = useRef<HTMLInputElement>(null)
  const inputRefDS = useRef<HTMLInputElement>(null)
  const inputRefDF = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [eventTitle, setEventTitle] = useState<string>("")
  const [eventDirection, setEventDirection] = useState<string>("")
  const [eventDescription, setEventDescription] = useState<string>("")
  const [eventOrganization, setEventOrganization] = useState<string>("")
  const [eventPrice, setEventPrice] = useState<string>("")
  const [eventSeats, setEventSeats] = useState<string>("")
  const [eventLink, setEventLink] = useState<string>("")
  const [eventPhoto, setEventPhoto] = useState<string>("")
  const [eventDateStart, setEventDateStart] = useState<string>("")
  const [eventDateFin, setEventDateFin] = useState<string>("")

  //funcion temporal para comprobar  datos  que guardamos con consol.log
  function addEvent() {
    const event: Event = {
      title: eventTitle,
      address: eventDirection,
      description: eventDescription,
      organization: eventOrganization,
      reservePrice: Number(eventPrice),
      capacity: Number(eventSeats),
      link: eventLink,
      startDate: eventDateStart,
      endDate: eventDateFin
    }
    eventStore.addRequestEvent('Bolea', event)
  }
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2 rounded-md" >
        <div className="h-20 w-full flex bg-indigo-800 rounded-t-md ">
          <div className="w-full flex flex-row gap-8 p-2 justify-between">
            <img src={logoEtno} alt="logo_Etno"></img>
            <p className='flex  text-white text-3xl p-3'>EVENTO</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-5 pl-3">
          <div className="flex flex-col  p-1 relative">
            <input autoFocus placeholder=" " type="text" name="eventTitle" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
                setEventTitle(value.currentTarget.value)
              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputRefDir.current != null) {
                    inputRefDir.current.focus()
                  }
                }
              }}></input>
            <label className={"float-input-lbl"}>Título</label>
          </div>
          <div className="flex flex-col mt-3 p-1 relative ">
            <input ref={inputRefDir} placeholder=" " type="text" name="eventDirection1" id="2" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
                setEventDirection(value.currentTarget.value)
              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (txtAreaRef.current != null) {
                    txtAreaRef.current.focus()
                  }
                }
              }}></input>
            <label className={"float-input-lbl"}>Dirección</label>
          </div>
          <div className="flex flex-col mt-3 p-1 relative">
            <textarea ref={txtAreaRef} placeholder=" " name="eventDescription" rows={3} className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
                setEventDescription(value.currentTarget.value)
              }} onKeyDown={(e) => {
                if (e.code === "NumpadEnter") {
                  if (inputRefOrg.current != null) {
                    inputRefOrg.current.focus()
                  }
                }
              }}></textarea>
            <label className={"float-txtArea-lbl"}>Descripción</label>
          </div>
          <div className="flex flex-col mt-3 p-1 relative">
            <input ref={inputRefOrg} placeholder=" " type="text" name="eventOrganization" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800"   onChange={(value) => {
                setEventOrganization(value.currentTarget.value)
              }} onKeyDown={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputRefPric.current != null) {
                    inputRefPric.current.focus()
                  }
                }
              }}></input>
            <label className={"float-txtArea-lbl"}>Organización</label>
          </div>
          <div className="flex flex-col mt-5 p-1">
            <div className="relative flex flex-row rounded-md">
              <div className=" pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm mt-1">€</span>
              </div>
              <CurrencyInput ref={inputRefPric} name="eventPrice" className="pl-7 mt-1 p-2 md:w-1/4 w-1/2 border-2 rounded-md  peer focus:outline-none focus:border-indigo-800 autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]"
                placeholder="0,00" decimalsLimit={2} onValueChange={(value, name) => console.log(value, name)}
                onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/^[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/, ""),
                  e.currentTarget.value = e.currentTarget.value.replace(/[^-,0-9]/, ""))} onChange={(value) => {
                    setEventPrice(value.currentTarget.value)
                    console.log(eventPrice)
                  }} onKeyDown={(e) => {
                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                      if (inputRefSeat.current != null) {
                        inputRefSeat.current.focus()
                      }
                    }
                  }} />
              <label className={"float-date-lbl"}>Precio de reserva </label>
            </div>
          </div>
          <div className="flex flex-col p-1 mt-5 relative">

            <input ref={inputRefSeat} type="text" name="eventSeats" placeholder="0" onInput={(e) => (
              e.currentTarget.value = e.currentTarget.value.replace(/^[^1-9]/, ""),
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")
            )} className="p-2 mt-1 md:w-1/4 w-1/2 border-2 rounded-md  peer focus:outline-none focus:border-indigo-800 autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]" onChange={(value) => {
              setEventSeats(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefLink.current != null) {
                  inputRefLink.current.focus()
                }
              }
            }} />
            <label className={"float-date-lbl"}>Aforo</label>
          </div>
          <div className="flex flex-col mt-3 relative p-1">
            <input ref={inputRefLink} placeholder=" " type="text" name="eventUrl" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
                setEventLink(value.currentTarget.value)
              }} onKeyDown={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputRefDS.current != null) {
                    inputRefDS.current.focus()
                  }
                }
              }}></input>
            <label className={"float-input-lbl"}>Pagina Web</label>
          </div>
          <div className="w-full flex flex-1 flex-col ">
            <div className="text-left p-1 ">
              <div className={"photoBoard"}>
                <div className='absolute left-3'>
                  Fotos
                </div>
                <form id="form-file-upload" className=" w-full flex justify-center">
                  <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                    setEventPhoto(value.currentTarget.value)
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
          <div className="flex flex-col p-1 relative mt-5">
            <input ref={inputRefDS} type="date" name="eventStart" className="w-40 border-2 rounded-md focus:outline-none peer
           focus:border-indigo-800" onChange={(value) => {
                setEventDateStart(value.currentTarget.value)
              }} onKeyDown={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputRefDF.current != null) {
                    inputRefDF.current.focus()
                  }
                }
              }} />
            <label className={"float-date-lbl"}>Fecha de Inicio</label>
          </div>
          <div className="flex flex-col p-1 relative mt-5">
            <input ref={inputRefDF} type="date" name="eventFinish" className="w-40 border-2 rounded-md focus:outline-none peer
           focus:border-indigo-800" onChange={(value) => {
                setEventDateFin(value.currentTarget.value)
              }} onKeyDown={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (btnRef.current != null) {
                    btnRef.current.focus()
                  }
                }
              }} />
            <label className={"float-date-lbl"}>Fecha de Final</label>
          </div>
        </div>
        <div className="flex m-auto justify-center p-3">
          <button ref={btnRef} name="eventBtnSave" className="btnStandard mr-10" onClick={addEvent}>Publicar</button>
          <button name="eventBtnCancel" className="btnStandard" onClick={() => navigate("/home")}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default CreateEvent