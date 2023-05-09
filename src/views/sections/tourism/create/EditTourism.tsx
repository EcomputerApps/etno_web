import { toast } from "react-toastify"
import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import GoogleMapReact from 'google-map-react';
import markerIcon from "../../../../assets/marker.svg"
import TourismStore from "../../../../viewmodels/tourism/TourismStore"
import { useEffect, useRef, useState } from "react";
import { Tourism } from "../../../../models/section/Section";
import { observer } from "mobx-react-lite";
import SideBarStore from "../../../../viewmodels/sidebar/SideBarStore";
import HoverSectionStore from "../../../../viewmodels/hoverSection/HoverSectionStore";
import { resizeFile } from "../../../../utils/global";

const sideBarStore = SideBarStore.getSideBarStore()
const tourismStore = TourismStore.getTourismStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

interface Marker {
  lat: number,
  lng: number,
  text: string
}

const EditTourism = () => {
  useEffect(() => {
    tourismStore.getAllTourismRequest(localStorage.getItem('user_etno_locality')!)
  }, [])

  function checkIfExist(title: string) {
    var flag: boolean = false
    if (title !== tourismTitleTemp) {
      tourismStore.getAllTourism.tourism?.map((item) => {
        if (item.title === title) {
          flag = true
        }
      })
    }
    return flag
  }

  const defaultProps = {
    center: {
      lat: 42.13775899999999,
      lng: -0.40838200000000713
    },
    zoom: 11
  };

  const inputTitle = useRef<HTMLInputElement>(null)
  const inputLong = useRef<HTMLInputElement>(null)
  const inputLat = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [tourism] = useState<Tourism>(tourismStore.getTourism)
  const [lat, setLat] = useState(Number(tourism.latitude!!))
  const [long, setLong] = useState(Number(tourism.longitude!!))
  const AnyReactComponent = (props: Marker) => <img style={{ width: '200', height: '200' }} src={props.text}></img>;
  const [tourismType, setTourismType] = useState<string>(tourism.type!!)
  const [tourismTitle, setTourismTitle] = useState<string>(tourism.title!!)
  const [tourismTitleTemp] = useState<string>(tourism.title!!)
  const [tourismDescription, setTourismDescription] = useState<string>(tourism.description!!)
  const [tourismLong, setTourismLong] = useState<string>(tourism.longitude!!)
  const [tourismLat, setTourismLat] = useState<string>(tourism.latitude!!)
  //const [file, setFile] = useState<File>()
  const [confirm, setConfirm] = useState<boolean>(false)
  const [emptyTitle, setEmptyTitle] = useState<boolean>(false)
  const [emptyType, setEmptyType] = useState<boolean>(false)
  const [emptyDescription, setEmptyDescription] = useState<boolean>(false)
  const [emptyFile, setEmptyFile] = useState<boolean>(false)
  const [emptyLongLat, setEmptyLongLat] = useState<boolean>(false)

  const [file, setFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  async function updateTourism() {
    if (checkIfExist(tourismTitle)) {
      toast.info('Ya existe este turismo', {
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
      checkIfEmpty()
      if (tourismType === '' || tourismTitle === '' || tourismDescription === '' || tourismLong === '' || tourismLat === '' || emptyFile) {
        toast.info('Rellene los campos', {
          position: 'top-center',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      } else {
        const tourism_: Tourism = {
          type: tourismType,
          title: tourismTitle,
          description: tourismDescription,
          longitude: String(long),
          latitude: String(lat),
          imageUrl: tourism.imageUrl
        }
        //const imageFile = await resizeFile(file!!);
        tourismStore.editTourism(localStorage.getItem('user_etno_locality')!, tourism.idTourism!!, tourism_, file!!)
        sideBarStore.updateSection('Turismo'); hoverSectionStore.setName('Turismo')
      }
    }
  }

  function checkIfEmpty() {
    tourismType === "" ? setEmptyType(true) : setEmptyType(false)
    tourismTitle === "" ? setEmptyTitle(true) : setEmptyTitle(false)
    tourismDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
    //file === undefined && tourism.imageUrl === '' ? setEmptyFile(true) : setEmptyFile(false)
    lat === 0 ? setEmptyLongLat(true) : setEmptyLongLat(false)
    long === 0 ? setEmptyLongLat(true) : setEmptyLongLat(false)
  }

  return (
    <div className="flex flex-col lg:m-auto  lg:w-1/2 w-11/12 h-screen    overflow-y-scroll border-2 rounded-md bg-white">
      {confirm ? (
        <div>
          <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
            <div className="fixed inset-0 w-screen h-screen">
              <div className=" flex justify-center mt-10 ">
                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                  <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                  <div className="flex justify-center m-auto mt-5 mb-3">
                    <button className="btnStandard w-14 h-10 mr-5 " onClick={() => tourismStore.setModalEdit(false)}>SI</button>
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
            <p className='flex  text-white lg:text-3xl text-2xl  p-3'>EDITAR TURISMO</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-8 pl-3">
          <div className={`rounded-md border-2 ${emptyType ? 'border-red-600'
            : 'border-transparent'
            }`}>
            <div className="flex flex-col pb-3 p-1 relative ">
              <div className="flex flex-wrap">
                {tourismStore.getTourismTypes.map((chkBtn, index) => (
                  <div key={index} className='flex lg:w-1/6 w-1/3'>
                    <input type="radio" id={chkBtn.id} name="tipeCheck" className="sr-only peer" value={chkBtn.value} defaultChecked={tourism.type === chkBtn.title} onChange={(e) => {
                      setTourismType(e.currentTarget.value)
                      setEmptyType(false)
                    }} />
                    <label htmlFor={chkBtn.id} className="w-full  text-center uppercase cursor-pointer p-2 mr-3 mt-3 font-medium text-xs rounded-md peer-checked:bg-indigo-800 border 
                            border-gray-300 
                            peer-checked:hover:bg-indigo-700 
                            peer-checked:text-white 
                            ring-indigo-500 peer-checked:ring-2 overflow-hidden ">{chkBtn.title}</label>
                  </div>
                ))}
              </div>
              <label className={"labelFloatDate"}>Categoría</label>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">
            <input defaultValue={tourismTitle} ref={inputTitle} placeholder=" " name="tourismTitle" type="text" className={`inputCamp peer ${emptyTitle ? 'border-red-600'
              : ''
              }`} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (txtAreaRef.current != null) {
                    txtAreaRef.current.focus()
                  }
                }
              }} onChange={(e) => {
                setTourismTitle(e.currentTarget.value)
                setEmptyTitle(false)
              }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
            <label className="labelFloatInput">Título</label>
          </div>
        </div >
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">
            <textarea defaultValue={tourismDescription} ref={txtAreaRef} placeholder=" " name="tourismDescription" rows={3} className={`inputCamp peer ${emptyDescription ? 'border-red-600'
              : ''
              }`} onKeyUp={(e) => {
                if ((e.code === "NumpadEnter")) {
                  if (inputLong.current != null) {
                    inputLong.current.focus()
                  }
                }
              }} onChange={(e) => {
                setTourismDescription(e.currentTarget.value)
                setEmptyDescription(false)
              }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
            <label className={"labelFloatTxtArea"}>Descripcíon</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="text-left p-1">
            <div className={`photoBoard ${emptyFile ? 'border-red-600' : ''}`}>
              <div className="absolute left-3">Foto {file?.name}</div>
              <form id="form-file-upload" className="w-full flex justify-center">
                <input
                  type="file"
                  id="input-file-upload"
                  className="visibility: hidden"
                  size={10485760}
                  accept=".png, .JPG, .jpg, .gif, .jpeg"
                  onChange={(value) => {
                    const selectedFile = value.currentTarget.files!![0];
                    setFile(selectedFile);
                    const reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onload = () => {
                      setSelectedImageUrl(reader.result as string);
                    };
                  }}
                />
                <label
                  id="label-file-upload"
                  htmlFor="input-file-upload"
                  className="w-full p-5"
                >
                  {selectedImageUrl ? (
                    <div className="flex m-auto flex-col items-center">
                      <img src={selectedImageUrl} alt="selected photo" />
                    </div>
                  ) : (
                    <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                      <img src={add_Photo} alt="photo" />
                      <p>Pulse en la zona para añadir una imagen</p>
                    </div>
                  )}
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className={`border-2 rounded-md m-1 ${emptyLongLat ? 'border-red-600'
            : ''
            }`}>
            <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyByVAayqkxKFNRi1QiNqua1jRCREORO7S0" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onClick={(e) => {
                  setLat(e.lat)
                  setLong(e.lng)
                  setEmptyLongLat(false)
                }}
              >
                <AnyReactComponent
                  lat={lat}
                  lng={long}
                  text={markerIcon}
                />
              </GoogleMapReact>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">
            <input value={long} ref={inputLong} placeholder=" " type="text" name="tourismLong" className="inputCamp peer" onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputLat.current != null) {
                  inputLat.current.focus()
                }
              }
            }} onChange={(e) => {
              setTourismLong(e.currentTarget.value)
            }} />
            <label className={"labelFloatInput"}>Longitud</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col p-1 relative">
            <input value={lat} ref={inputLat} placeholder=" " type="text" name="tourismLat" className="inputCamp peer" onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (btnRef.current != null) {
                  btnRef.current.focus()
                }
              }
            }} onChange={(e) => {
              setTourismLat(e.currentTarget.value)
            }} />
            <label className={"labelFloatInput"}>Latitud</label>
          </div>
        </div>
        <div className="  flex m-auto justify-center left-0 right-0 p-3 bottom-1">
          <button ref={btnRef} name="tourismBtnSave" className="btnStandard mr-10" onClick={() => updateTourism()}>Guardar</button>
          <button name="tourismBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default observer(EditTourism)