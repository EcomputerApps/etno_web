import logoEtno from '../../../../assets/logo_etno.png'
import { useEffect, useRef, useState } from "react"
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import NecrologueStore from '../../../../viewmodels/necrologue/NecrologueStore'
import { Necrologue } from '../../../../models/section/Section'
import { toast, ToastContainer } from 'react-toastify'
import moment from 'moment'
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore'
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore'
import { resizeFile } from '../../../../utils/global'

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const necroStore = NecrologueStore.getNecrologueStore()

const EditNecrologue = () => {

  useEffect(() => {
    necroStore.getAllNecrologuesRequest(localStorage.getItem('user_etno_locality')!)
  }, [])

  function checkIfExist(name: string) {
    var flag: boolean = false
    if (name !== necroNameTemp) {
      necroStore.getAllNecrologues.necrologues?.map((item) => {
        if (item.name === name) {
          flag = true
        }
      })
    }
    return flag
  }

  const [necro] = useState<Necrologue>(necroStore.getNecro)
  const inputRef = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [necroName, setNecroName] = useState<string>(necro.name!!)
  const [necroNameTemp] = useState<string>(necro.name!!)
  const [necroDate, setNecroDate] = useState<string>(necro.deathDate!!)
  const [necroDescription, setNecroDescription] = useState<string>(necro.description!!)
  //const [file, setFile] = useState<File>()
  const [emptyName, setEmptyName] = useState<boolean>(false)
  const [emptyDate, setEmptyDate] = useState<boolean>(false)
  const [emptyDescption, setEmptyDescription] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)

  const [file, setFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const [emptyFile, setEmptyFile] = useState(false)

  async function updateNecrologue(necroId: string) {
    if (checkIfExist(necroName)) {
      toast.info('Ya existe este necrólogo', {
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
      if (necroName === "" || necroDate === "" || necroDescription === "") {
        toast.error('Rellene todos los campos', {
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
        const newNecro: Necrologue = {
          name: necroName,
          deathDate: necroDate,
          description: necroDescription,
          imageUrl: necro.imageUrl
        }
        //const imageFile = await resizeFile(file!!);
        necroStore.editNecro(localStorage.getItem('user_etno_locality')!, necroId, newNecro, file!!); sideBarStore.updateSection('Fallecimientos'); hoverSectionStore.setName('Fallecimientos')
      }
    }
  }

  function chekIfEmpty() {
    necroName === "" ? setEmptyName(true) : setEmptyName(false)
    necroDate === "" ? setEmptyDate(true) : setEmptyDate(false)
    necroDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
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
                    <button className="btnStandard w-14 h-10 mr-5 " onClick={() => necroStore.setModalEdit(false)}>SI</button>
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
            <p className='flex  text-white lg:text-3xl text-2xl p-3'>FALLECIMIENTO</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-5 pl-3">
          <div className="flex flex-col p-1 relative">
            <input autoFocus placeholder=" " name="necroName" defaultValue={necro.name} type="text" className={`inputCamp peer ${emptyName ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNecroName(value.currentTarget.value)
                setEmptyName(false)
              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputRef.current != null) {
                    inputRef.current.focus()
                  }
                }
              }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
            <label className={"labelFloatInput"}>Nombre</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-5 pl-3">
          <div className="flex flex-col p-1 relative">
            <input ref={inputRef} type="date" name="necroDate" defaultValue={moment(necro.deathDate).add(1, "days").toISOString().substring(0, 10)}
              className={`inputCamp peer w-40 ${emptyDate ? 'border-red-600'
                : ''
                }`} onChange={(value) => {
                  setNecroDate(value.currentTarget.value)
                  setEmptyDate(false)
                }} onKeyUp={(e) => {
                  if ((e.code === "NumpadEnter")) {
                    if (txtAreaRef.current != null) {
                      txtAreaRef.current.focus()
                    }
                  }
                }} />
            <label className={"labelFloatDate"}>Fecha de fallecimiento</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="flex flex-col  p-1 relative">
            <textarea ref={txtAreaRef} placeholder=" " defaultValue={necro.description} name="eventDescription" rows={3} className={`inputCamp peer ${emptyDescption ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNecroDescription(value.currentTarget.value)
                setEmptyDescription(false)
              }} onKeyDown={(e) => {
                if (e.code === "NumpadEnter") {
                  if (btnRef.current != null) {
                    btnRef.current.focus()
                  }
                }
              }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
            <label className={"labelFloatTxtArea"}>Descripción</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col mt-3 pl-3">
          <div className="text-left p-1 relative">
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
      </div>
      <div className="flex m-auto justify-center left-0 right-0 p-3 bottom-1">
        <button ref={btnRef} name="pharmacyBtnSave" className="btnStandard mr-10" onClick={() => {
          updateNecrologue(necro.idDeath!!)
        }}>Publicar</button>
        <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
      </div>
    </div>
  )
}
export default EditNecrologue