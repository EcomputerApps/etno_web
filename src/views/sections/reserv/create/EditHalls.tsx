import { observer } from "mobx-react-lite"
import { useState } from "react"
import { toast } from "react-toastify"
import logoEtno from '../../../../assets/logo_etno.png'
import { Hall } from "../../../../models/section/Section"
import ReserveStore from "../../../../viewmodels/reserv/ReserveStore"


const reserveStore = ReserveStore.getReserveStore()

const EditHalls = () => {

    const [hallName, setHallName] = useState<string>("")
    const [hallList, setHallList] = useState<Array<Hall>>(reserveStore.getHallList!!)
    function addHallToList() {
        const hall: Hall = {
            username: "Bolea",
            name: hallName
        }
        chekIfEmpty()
        if (hallName === "") {
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
            hallList.push(hall)
            setHallList(hallList)
            setHallName("")
        }

    }
    function addHallToPlace() {
        reserveStore.updateHallList(hallList)
        setHallList([{ name: "" }])
        reserveStore.setModalEditHalls(false)
    }
    const [emptyName, setEmptyName] = useState(false)
    function chekIfEmpty() {
        hallName === "" ? setEmptyName(true) : setEmptyName(false)

    }
    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2  w-11/12 lg:h-screen border-2 rounded-md bg-white">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>Editar sala</p>
                </div>
            </div>
            <div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input autoFocus placeholder=" "
                            name="bandType" type="text" required={true} value={hallName}
                            className={`inputCamp peer ${emptyName ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => setHallName(e.currentTarget.value)} />
                        <label className="labelFloatInput">Nombre de la sala</label>
                    </div>
                </div>
                <div className="flex justify-center items-center m-auto py-5 pl-10">
                    <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => addHallToList()}>Añadir sala</button>
                </div>
                <div className="lg:w-full  w-full flex border-2 rounded-md  flex-col shadow-sm">
                    <div className="flex justify-center text-xl font-semibold">Salas</div>
                    <div className="flex flex-col h-96   items-center overflow-y-auto">
                        {hallList.map((item, index) => (
                            <div key={index} className='flex w-full border-t-2'>
                                <label className="peer-checked:bg-indigo-300
                                 hover:bg-indigo-100 w-full flex  m-auto justify-center items-center   h-10 text-xl ">{item.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className=" lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => addHallToPlace()}>Publicar</button>
                <button name="bandBtnCancel" className="btnStandard" onClick={() => reserveStore.setModalEditHalls(false)}>Volver</button>
            </div>
        </div>
    )
}
export default observer(EditHalls)