import { observer } from "mobx-react-lite";
import logoEtno from '../../../../assets/logo_etno.png'
import GoogleMapReact from 'google-map-react';
import markerIcon from "../../../../../src/assets/marker.svg"
import { useState } from "react";
import ReserveStore from "../../../../viewmodels/reserv/ReservStore";
import AddHalls from "./AddHalls";
import { Hall, Place } from "../../../../models/section/Section";
import { toast } from "react-toastify";
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import add_Photo from '../../../../assets/menu/add_photo.svg'

const reserveStore = ReserveStore.getReserveStore()
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
interface Marker {
    lat: number,
    lng: number,
    text: string
}
reserveStore.updateHallList([])
const CreatePlace = () => {

    const [file, setFile] = useState<File>()
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const AnyReactComponent = (props: Marker) => <img style={{ width: '200', height: '200' }} src={props.text}></img>;

    const defaultProps = {
        center: {
            lat: 42.13775899999999,
            lng: -0.40838200000000713
        },
        zoom: 11
    }

    const [placeName, setPalceName] = useState<string>("")
    function addPlace() {
        const newPlace: Place = {
            name: placeName,
            latitude: lat,
            longitude: long,
            halls: reserveStore.getHallList.content
        }

        chekIfEmpty()
        if (placeName === "" || lat === 0 || long === 0 || file === undefined || reserveStore.getHallList.content?.length === 0 || reserveStore.getHallList.content![0].name === "") {
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
            reserveStore.addRequestPlace("Bolea", newPlace, file!!);
            reserveStore.updateHallList([])
            sideBarStore.updateSection('Reservas');
            hoverSectionStore.setName('Reservas')
        }



    } function goBack() {
        reserveStore.updateHallList([])
        reserveStore.setModalCreatePlaces(false)
    }
    function chekIfEmpty() {
        placeName === "" ? setEmptyName(true) : setEmptyName(false)
        reserveStore.getHallList.content?.length === 0 || reserveStore.getHallList === undefined ? setEmptyHalls(true) : setEmptyHalls(false)
        file === undefined ? setEmptyFile(true) : setEmptyFile(false)
        long === 0 || lat === 0 ? setEmptyLongLat(true) : setEmptyLongLat(false)
    }

    const [emptyHalls, setEmptyHalls] = useState(false)
    const [emptyName, setEmptyName] = useState(false)
    const [emptyFile, setEmptyFile] = useState(false)
    const [emptyLongLat, setEmptyLongLat] = useState(false)

    return (
        <div className="flex flex-col md:m-auto w-1/2 md:h-screen border-2 rounded-md bg-white overflow-y-auto">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3 uppercase'>Crear nuevo lugar</p>
                </div>
            </div>
            <div className="w-full flex flex-col mt-5 pl-3  ">
                <div className="flex flex-col p-1 relative">
                    <input autoFocus placeholder=" " name="pharmacyName" type="text" className={`inputCamp peer ${emptyName ? 'border-red-600'
                        : ''
                        }`}
                        onChange={(e) => setPalceName(e.currentTarget.value)} />
                    <label className={"labelFloatInput"}>Nombre</label>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3 ">
                <div className="text-left p-1">
                    <div className={`photoBoard  ${emptyFile ? 'border-red-600'
                        : ''
                        }`} >
                        <div className='pl-3'>
                            Foto {file?.name}
                        </div>
                        <form id="form-file-upload" className=" w-full flex justify-center">
                            <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                                setFile(e.currentTarget.files!![0])
                                setEmptyFile(false)
                            }} />
                            <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                                <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                                    <img src={add_Photo} alt="photo" />
                                    <p>Pulse en la zona para añadir una imagen</p>
                                </div>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full flex  flex-col mt-3 pl-3">
                <div className={`border-2 rounded-md m-1 ${emptyLongLat ? 'border-red-600'
                    : ''
                    }`}>
                    <div style={{ height: '50vh', width: '100%', padding: "2px" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyByVAayqkxKFNRi1QiNqua1jRCREORO7S0" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            onClick={(e) => {
                                setLat(e.lat)
                                setLong(e.lng)
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
            <div className="flex flex-row">
                <div className="w-full flex flex-col mt-5 pl-3 ">
                    <div className="flex flex-col p-1 relative">
                        <input value={long} autoFocus placeholder=" " name="pharmacyName" disabled type="text" className="inputCamp peer  "
                        />
                        <label className={"labelFloatDate"}>Longitud</label>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-5 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <input value={lat} autoFocus placeholder=" " name="pharmacyName" disabled type="text" className="inputCamp peer  "
                        />
                        <label className={"labelFloatDate"}>Latitude</label>
                    </div>
                </div>
            </div>
            {reserveStore.getModalAddHalls ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  backdrop-blur-sm flex justify-center items-center"  >
                        <AddHalls />
                    </div>
                </div>
            ) : <></>}
            <div className="flex flex-row  mt-5 pl-3 ">
                <div className="pr-5">
                    <button className="btnStandard uppercase justify-center" onClick={() => reserveStore.setModalAddHalls(true)}>Añadir salas</button>
                </div>
                <div className={`border-2 w-5/6  m-auto p-2 rounded-md h-12 ${emptyHalls ? 'border-red-600'
                    : ''
                    }`}>
                    {reserveStore.getHallList.content?.map((item, index) => (
                        <label key={index} className="text-xl">{item.name + " "}</label>
                    ))}

                </div>

            </div>
            <div className=" flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button name="pharmacyBtnSave" className="btnStandard mr-10" onClick={() => addPlace()}>Publicar</button>
                <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => goBack()}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(CreatePlace)