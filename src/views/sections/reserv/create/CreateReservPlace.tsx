import { observer } from "mobx-react-lite";
import logoEtno from '../../../../assets/logo_etno.png'
import GoogleMapReact from 'google-map-react';
import markerIcon from "../../../../../src/assets/marker.svg"
import { useState } from "react";
import ReserveStore from "../../../../viewmodels/reserv/ReservStore";

const reserveStore = ReserveStore.getReserveStore()

interface Marker {
    lat: number,
    lng: number,
    text: string
}

const CreateReservPlace = () => {
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const AnyReactComponent = (props: Marker) => <img style={{ width: '200', height: '200' }} src={props.text}></img>;
    const [emptyLongLat, setEmptyLongLat] = useState(false)
    const defaultProps = {
        center: {
            lat: 42.13775899999999,
            lng: -0.40838200000000713
        },
        zoom: 11
    };

    return (
        <div className="flex flex-col md:m-auto w-1/2 md:h-screen border-2 rounded-md bg-white">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3 uppercase'>Crear nuevo lugar</p>
                </div>
            </div>
            <div className="w-full flex flex-col mt-5 pl-3  ">
                <div className="flex flex-col p-1 relative">
                    <input autoFocus placeholder=" " name="pharmacyName" type="text" className="inputCamp peer  "
                    />
                    <label className={"labelFloatInput"}>Nombre</label>
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
                        <input autoFocus placeholder=" " name="pharmacyName" disabled type="text" className="inputCamp peer  "
                        />
                        <label className={"labelFloatDate"}>Longitud</label>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-5 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <input autoFocus placeholder=" " name="pharmacyName" disabled type="text" className="inputCamp peer  "
                        />
                        <label className={"labelFloatDate"}>Latitude</label>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col mt-5 pl-3">
                <button className="btnStandard uppercase justify-center" >Añadir salas</button>
            </div>
            <div className="md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button name="pharmacyBtnSave" className="btnStandard mr-10" >Publicar</button>
                <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => reserveStore.setModalReservCreatePlaces(false)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(CreateReservPlace)