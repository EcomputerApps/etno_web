
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";


import { useNavigate } from "react-router-dom";


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
  function checkState() {
    console.log(eventTitle)
    console.log(eventDirection)
    console.log(eventDescription)
    console.log(eventOrganization)
    console.log(eventPrice)
    console.log(eventSeats)
    console.log(eventLink)
    console.log(eventPhoto)
    console.log(eventDateStart)
    console.log(eventDateFin)
  }
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2" >
        <div className="h-20 w-full flex bg-indigo-800 rounded-t-md ">
          <div className="w-full flex flex-row gap-8 p-2 justify-between">
            <img src="https://etno.ecomputer.es/images/app.png" alt="logo_etno"></img>
            <p className='flex  text-white text-3xl p-3'>EVENTO</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col  pl-3">
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Título</label>
            <input autoFocus placeholder="Titulo" type="text" name="eventTitle" className="border-2 rounded-md p-2" onChange={(value) => {
              setEventTitle(value.currentTarget.value)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefDir.current != null) {
                  inputRefDir.current.focus()
                }
              }
            }}></input>
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Dirección</label>
            <input ref={inputRefDir} placeholder="Direccion" type="text" name="eventDirection1" id="2" className="border-2 rounded-md p-2" onChange={(value) => {
              setEventDirection(value.currentTarget.value)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (txtAreaRef.current != null) {
                  txtAreaRef.current.focus()
                }
              }

            }}></input>
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Descripción</label>
            <textarea ref={txtAreaRef} placeholder="Description" name="eventDescription" rows={3} className="border-2 rounded-sm p-2" onChange={(value) => {
              setEventDescription(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if (e.code === "NumpadEnter") {
                if (inputRefOrg.current != null) {
                  inputRefOrg.current.focus()
                }
              }

            }}></textarea>
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Organización</label>
            <input ref={inputRefOrg} placeholder="Organizacion" type="text" name="eventOrganization" className="border-2 rounded-sm p-2" onChange={(value) => {
              setEventOrganization(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefPric.current != null) {
                  inputRefPric.current.focus()
                }
              }

            }}></input>
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Precio de reserva</label>
            <div className="relative flex flex-row mt-1 rounded-md">
              <div className=" pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">€</span>
              </div>
              <CurrencyInput ref={inputRefPric} name="eventPrice" className="pl-7 p-2 md:w-1/4 w-1/2 border-2 rounded-sm"
                placeholder="0,00" decimalsLimit={2} onValueChange={(value, name) => console.log(value, name)}
                onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/, ""),
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
            </div>
          </div>
          <div className="flex flex-col p-1">
            <label className="text-left text-2xl p-1">Aforo</label>
            <input ref={inputRefSeat} type="text" name="eventSeats" placeholder="0" onInput={(e) => (
              e.currentTarget.value = e.currentTarget.value.replace(/^[^1-9]/, ""),
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")
            )} className="p-2 md:w-1/4 w-1/2   border-2 rounded-sm" onChange={(value) => {
              setEventSeats(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefLink.current != null) {
                  inputRefLink.current.focus()
                }
              }

            }} />
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1"
            >Enlace</label>
            <input ref={inputRefLink} placeholder="www.ecomputer.es" type="text" name="eventUrl" className="border-2 rounded-sm p-2" onChange={(value) => {
              setEventLink(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefDS.current != null) {
                  inputRefDS.current.focus()
                }
              }

            }}></input>
          </div>
          <div className="w-full flex flex-1 flex-col pl-3">
            <div className="text-left p-1 ">
              <label className=" text-2xl">Fotos</label>
              <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300  ">
                <form id="form-file-upload" className=" w-full flex justify-center">
                  <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                    setEventPhoto(value.currentTarget.value)
                  }} />
                  <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                    <div className="flex m-auto flex-col items-center text-gray-400 text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#BDBDBD"><path d="M9 42q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h20.45v3H9v30h30V18.6h3V39q0 
                  1.25-.875 2.125T39 42Zm26-24.9v-4.05h-4.05v-3H35V6h3v4.05h4.05v3H38v4.05ZM12 33.9h24l-7.2-9.6-6.35 8.35-4.7-6.2ZM9 9v30V9Z"/></svg>
                      <p>Pulse en la zona para añadir una imagen</p>
                    </div>
                  </label>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-1 m-auto justify-center p-3">
            <img className='rounded-md' src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5" alt="googlemap"></img>
          </div>

          <div className="flex flex-col p-1">
            <label className="text-left text-2xl p-1">Fecha de Inicio</label>
            <input ref={inputRefDS} type="date" name="eventStart" className="w-40 border-2 rounded-sm" onChange={(value) => {
              setEventDateStart(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefDF.current != null) {
                  inputRefDF.current.focus()
                }
              }

            }} />
          </div>
          <div className="flex flex-col p-1">
            <label className="text-left text-2xl p-1">Fecha de Final</label>
            <input ref={inputRefDF} type="date" name="eventFinish" className="w-40 border-2 rounded-sm" onChange={(value) => {
              setEventDateFin(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (btnRef.current != null) {
                  btnRef.current.focus()
                }
              }

            }} />
          </div>
        </div>
        <div className="flex m-auto justify-center p-3">
          <button ref={btnRef} name="eventBtnSave" className="inline-flex items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => {
            checkState()

          }}>Publicar</button>
          <button name="eventBtnCancel" className="inline-flex items-center rounded-md border  border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => navigate("/home")}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default CreateEvent