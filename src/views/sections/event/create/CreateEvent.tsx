import logoEtno from '../../../../assets/logo_etno.png'
import { useEffect, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import { Event } from '../../../../models/section/Section';
import EventStore from '../../../../viewmodels/Event/EventStore';
import { toast } from 'react-toastify';
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import { observer } from 'mobx-react-lite';
const eventStore = EventStore.getEventStore()
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

const CreateEvent = () => {
  useEffect(() => {
    eventStore.getAllEventsRequest("Bolea")
  }, [])

  function checkIfExist(title: string) {
    var flag: boolean = false
    eventStore.getAllEvents.events?.map((item) => {
      if (item.title === title) {
        flag = true
      }
    })
    return flag
  }
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
  const [subscription, setSubscription] = useState<boolean>(false)
  const [eventPrice, setEventPrice] = useState<string>("")
  const [eventSeats, setEventSeats] = useState<string>("")
  const [eventLink, setEventLink] = useState<string>("")
  const [eventDateStart, setEventDateStart] = useState<string>("")
  const [eventDateFin, setEventDateFin] = useState<string>("")
  const [file, setFile] = useState<File>()
  const [confirm, setConfirm] = useState<boolean>(false)
  const [emptyTitle, setEmptyTitle] = useState<boolean>(false)
  const [emptyDescription, setEmptyDescription] = useState<boolean>(false)
  const [emptyDirection, setEmptyDirection] = useState<boolean>(false)
  const [emptyFile, setEmptyFile] = useState<boolean>(false)
  const [emptyOrganization, setEmptyOrganization] = useState<boolean>(false)
  const [emptySeats, setEmptySeats] = useState<boolean>(false)
  const [emptyLink, setEmptyLink] = useState<boolean>(false)
  const [emptyStartdate, setEmptyStartdate] = useState<boolean>(false)
  const [emptyFinDate, setEmptyFinDate] = useState<boolean>(false)
  const [dateFail, setDateFail] = useState<boolean>(false)

  function addEvent() {
    const eventNew: Event = {
      title: eventTitle,
      address: eventDirection,
      description: eventDescription,
      organization: eventOrganization,
      hasSubscription: subscription,
      reservePrice: Number(eventPrice),
      capacity: Number(eventSeats),
      link: eventLink,
      startDate: eventDateStart,
      endDate: eventDateFin
    }
    if (checkIfExist(eventNew.title!!)) {
      toast.info('Ya existe este evento', {
        position: 'bottom-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    } else {
      if (subscription) {
        checkIfEmpty()
        eventTitle === '' || eventDirection === '' || eventDescription === ''
          || eventOrganization === '' || eventPrice === ''
          || eventSeats === '' || eventLink === '' || eventDateStart === ''
          || eventDateFin === '' || file === undefined ?

          toast.error('Rellene los campos vacíos', {
            position: 'bottom-center',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light'
          }) : eventStore.addRequestEvent(localStorage.getItem('user_etno_locality')!, eventNew, file!!)
      } else {
        eventNew.reservePrice = 0
        checkIfEmpty()
        eventTitle === '' || eventDirection === '' || eventDescription === ''
          || eventOrganization === ''
          || eventSeats === '' || eventLink === '' || eventDateStart === ''
          || eventDateFin === '' || file === undefined || eventDateStart.localeCompare(eventDateFin) === 1 ?

          toast.error('Rellene los campos correcto', {
            position: 'bottom-center',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light'
          }) : eventStore.addRequestEvent(localStorage.getItem('user_etno_locality')!, eventNew, file!!); sideBarStore.updateSection('Eventos'); hoverSectionStore.setName('Eventos')
      }
    }
  }

  const freeOrNot = (payType: boolean) => {
    if (payType) {
      return "Evento de pago."
    } else {
      return "Evento gratuito."
    }
  }

  function checkIfEmpty() {
    eventTitle === "" ? setEmptyTitle(true) : setEmptyTitle(false)
    eventDirection === "" ? setEmptyDirection(true) : setEmptyDirection(false)
    eventDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
    file === undefined ? setEmptyFile(true) : setEmptyFile(false)
    eventOrganization === "" ? setEmptyOrganization(true) : setEmptyOrganization(false)
    eventSeats === '' ? setEmptySeats(true) : setEmptySeats(false)
    eventLink === '' ? setEmptyLink(true) : setEmptyLink(false)
    eventDateStart === '' || eventDateStart.localeCompare(eventDateFin) === 1 ? setEmptyStartdate(true) : setEmptyStartdate(false)
    eventDateFin === '' || eventDateStart.localeCompare(eventDateFin) === 1 ? setEmptyFinDate(true) : setEmptyFinDate(false)
    eventDateStart.localeCompare(eventDateFin) === 1 ? setDateFail(true) : setDateFail(false)
  }

  return (
    <div className="flex flex-col lg:m-auto  lg:w-1/2  w-11/12    h-screen overflow-y-auto border-2 rounded-md bg-white">
      {confirm ? (
        <div>
          <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
            <div className="fixed inset-0 w-screen h-screen">
              <div className=" flex justify-center mt-10 ">
                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                  <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                  <div className="flex justify-center m-auto mt-5 mb-3">
                    <button className="btnStandard w-14 h-10 mr-5 " onClick={() => eventStore.setModalCreate(false)}>SI</button>
                    <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : <></>}
      <div className="h-20 w-full flex bg-indigo-800 rounded-t-md ">
        <div className="w-full flex flex-row gap-8 p-2 justify-between">
          <img src={logoEtno} alt="logo_Etno"></img>
          <p className='flex  text-white lg:text-3xl text-2xl p-3'>CREAR EVENTO</p>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-5 pl-3">
        <div className="flex flex-col  p-1 relative">
          <input autoFocus placeholder=" " type="text" name="eventTitle" className={`inputCamp peer ${emptyTitle ? 'border-red-600'
            : ''
            }`} onChange={(value) => {
              setEventTitle(value.currentTarget.value)
              setEmptyTitle(false)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefDir.current != null) {
                  inputRefDir.current.focus()
                }
              }
            }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
          <label className={"labelFloatInput"}>Título</label>
        </div>
        <div className="flex flex-col mt-3 p-1 relative ">
          <input ref={inputRefDir} placeholder=" " type="text" name="eventDirection1" id="2" className={`inputCamp peer ${emptyDirection ? 'border-red-600'
            : ''
            }`} onChange={(value) => {
              setEventDirection(value.currentTarget.value)
              setEmptyDirection(false)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (txtAreaRef.current != null) {
                  txtAreaRef.current.focus()
                }
              }
            }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
          <label className={"labelFloatInput"}>Dirección</label>
        </div>
        <div className="flex flex-col mt-3 p-1 relative">
          <textarea ref={txtAreaRef} placeholder=" " name="eventDescription" rows={3} className={`inputCamp peer ${emptyDescription ? 'border-red-600'
            : ''
            }`} onChange={(value) => {
              setEventDescription(value.currentTarget.value)
              setEmptyDescription(false)
            }} onKeyDown={(e) => {
              if (e.code === "NumpadEnter") {
                if (inputRefOrg.current != null) {
                  inputRefOrg.current.focus()
                }
              }
            }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
          <label className={"labelFloatTxtArea"}>Descripción</label>
        </div>
        <div className="flex flex-col mt-3 p-1 relative">
          <input ref={inputRefOrg} placeholder=" " type="text" name="eventOrganization" className={`inputCamp peer ${emptyOrganization ? 'border-red-600'
            : ''
            }`} onChange={(value) => {
              setEventOrganization(value.currentTarget.value)
              setEmptyOrganization(false)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefPric.current != null) {
                  inputRefPric.current.focus()
                }
              }
            }}></input>
          <label className={"labelFloatTxtArea"}>Organización</label>
        </div>
        <div className="flex flex-col p-1 mt-5 relative">
          <input ref={inputRefSeat} type="text" name="eventSeats" placeholder="0" onInput={(e) => (
            e.currentTarget.value = e.currentTarget.value.replace(/^[^1-9]/, ""),
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, ""),
            e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')
          )} minLength={1} maxLength={5} className={`inputCamp peer  p-2 mt-1 md:w-1/4 w-1/2 ${emptySeats ? 'border-red-600'
            : ''
            }`} onChange={(value) => {
              setEventSeats(value.currentTarget.value)
              setEmptySeats(false)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefLink.current != null) {
                  inputRefLink.current.focus()
                }
              }
            }} />
          <label className={"labelFloatDate"}>Aforo</label>
        </div>
        <div className="flex flex-row p-1 mt-5 relative ">
          <label className="relative inline-flex items-center mr-5 cursor-pointer w-14">
            <input type="checkbox" value="" className="sr-only peer" onChange={(e) => {
              setSubscription(e.currentTarget.checked)
            }}></input>
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600
             peer-checked:bg-indigo-600"></div>
          </label>
          <span className="ml-3 text-xl font-medium text-gray-900 dark:text-gray-300">{freeOrNot(subscription)}</span>
        </div>
        <div className="flex flex-col mt-5 p-1">
          <div className="relative flex flex-row rounded-md">
            <div className=" pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm mt-1">€</span>
            </div>
            <CurrencyInput ref={inputRefPric} disabled={!subscription} name="eventPrice" className="pl-7 mt-1 p-2 md:w-1/4 w-1/2 inputCamp peer disabled:bg-gray-200 disabled:text-gray-200  "
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
            <label className={"labelFloatDate"}>Precio de reserva </label>
          </div>
        </div>
        <div className="flex flex-col mt-3 relative p-1">
          <input ref={inputRefLink} placeholder=" " type="text" name="eventUrl" className={`inputCamp peer ${emptyLink ? 'border-red-600'
            : ''
            }`} onChange={(value) => {
              setEventLink(value.currentTarget.value)
              setEmptyLink(false)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefDS.current != null) {
                  inputRefDS.current.focus()
                }
              }
            }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
          <label className={"labelFloatInput"}>Pagina Web</label>
        </div>
        <div className="w-full flex flex-1 flex-col ">
          <div className="text-left p-1 ">
            <div className={`photoBoard ${emptyFile ? 'border-red-600'
              : ''
              }`}>
              <div className='absolute left-3'>
                Foto {file?.name}
              </div>
              <form id="form-file-upload" className=" w-full flex justify-center">
                <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
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
        <div className="flex flex-row p-1 relative mt-5 ">
          <input ref={inputRefDS} type="date" name="eventStart" className={`inputCamp peer w-40 ${emptyStartdate ? 'border-red-600'
            : ''
            }`} onChange={(value) => {
              setEventDateStart(value.currentTarget.value)
              setEmptyStartdate(false)
              setDateFail(false)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefDF.current != null) {
                  inputRefDF.current.focus()
                }
              }
            }} />
          <label className={"labelFloatDate"}>Fecha de Inicio</label>
          {dateFail ? <label className='ml-3 font-medium text-xl text-red-600 m-auto'>Fechas</label> : ""}
        </div>
        <div className="flex flex-row p-1 relative mt-5">
          <input ref={inputRefDF} type="date" name="eventFinish" className={`inputCamp peer w-40 ${emptyFinDate ? 'border-red-600'
            : ''
            }`} onChange={(value) => {
              setEventDateFin(value.currentTarget.value)
              setEmptyFinDate(false)
              setDateFail(false)
            }} onKeyDown={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (btnRef.current != null) {
                  btnRef.current.focus()
                }
              }
            }} />
          <label className={"labelFloatDate"}>Fecha de Final</label>
          {dateFail ? <label className='ml-3 font-medium text-xl text-red-600 m-auto'>incorrectas</label> : ""}
        </div>
      </div>
      <div className="flex m-auto justify-center p-3">
        <button ref={btnRef} name="eventBtnSave" className="btnStandard mr-10" onClick={addEvent}>Publicar</button>
        <button name="eventBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
      </div>
    </div>
  )
}
export default observer(CreateEvent)