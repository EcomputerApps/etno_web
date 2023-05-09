import logoEtno from '../../../../assets/logo_etno.png'
import { useEffect, useRef, useState } from "react"
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import NewsStore from '../../../../viewmodels/news/NewsStore'
import { News } from '../../../../models/section/Section'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import Resizer from 'react-image-file-resizer'
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import { resizeFile } from '../../../../utils/global'

const newsStore = NewsStore.getNewsStore()
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()

const CreateNews = () => {
  useEffect(() => {
    newsStore.getAllNewsRequest(localStorage.getItem('user_etno_locality')!)
  }, [])

  function checkIfExist(title: string) {
    var flag: boolean = false
    newsStore.getAllNews.news?.map((item) => {
      if (item.title === title) {
        flag = true
      }
    })
    return flag
  }

  const inputRefCatg = useRef<HTMLInputElement>(null)
  const inputRefTit = useRef<HTMLInputElement>(null)
  const inputRefDate = useRef<HTMLInputElement>(null)
  const inputRefLink = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [newsCategory, setNewsCategory] = useState<string>("")
  const [newsTitle, setNewsTitle] = useState<string>("")
  const [newsDate, setNewsDate] = useState<string>("")
  const [newsDescription, setNewsDescription] = useState<string>("")
  //const [file, setFile] = useState<File>() 
  const [confirm, setConfirm] = useState<boolean>(false)
  const [emptyCategory, setEmptyCategory] = useState<boolean>(false)
  const [emptyTitle, setEmptyTitle] = useState<boolean>(false)
  const [emptyFile, setEmptyFile] = useState<boolean>(false)
  const [emptyDate, setEmptyDate] = useState<boolean>(false)
  const [emptyDescption, setEmptyDescription] = useState<boolean>(false)

  const [file, setFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);


  async function addNews(e: any) {
    const news: News = {
      category: newsCategory,
      title: newsTitle,
      description: newsDescription,
      publicationDate: newsDate
    }

    chekIfEmpty()
    if (newsCategory === '' || newsTitle === '' || newsDate === '') {
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
      newsStore.addRequestNews(localStorage.getItem('user_etno_locality')!, news, file!!)
      sideBarStore.updateSection('Noticias')
      hoverSectionStore.setName('Noticias')
    }
  }

  function chekIfEmpty() {
    newsCategory === "" ? setEmptyCategory(true) : setEmptyCategory(false)
    newsTitle === "" ? setEmptyTitle(true) : setEmptyTitle(false)
    newsDate === "" ? setEmptyDate(true) : setEmptyDate(false)
    newsDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
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
                    <button className="btnStandard w-14 h-10 mr-5 " onClick={() => newsStore.setModalCreate(false)}>SI</button>
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
            <p className='flex  text-white lg:text-3xl text-2xl p-3'>NOTICIAS</p>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="flex flex-col p-1 mt-3 relative">
            <input ref={inputRefTit} placeholder=" " autoFocus name="newsTitle" type="text" className={`inputCamp peer ${emptyTitle ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNewsTitle(value.currentTarget.value)
                setEmptyTitle(false)
              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputRefDate.current != null) {
                    inputRefDate.current.focus()
                  }
                }
              }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
            <label className={"labelFloatInput"}>Titulo</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="flex flex-col p-1 mt-3 relative">
            <input ref={inputRefCatg} placeholder=" " name="newsCatg" type="text" className={`inputCamp peer ${emptyCategory ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNewsCategory(value.currentTarget.value)
                setEmptyCategory(false)
              }} onKeyUp={(e) => {
                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                  if (inputRefDate.current != null) {
                    inputRefDate.current.focus()
                  }
                }
              }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
            <label className={"labelFloatInput"}>Categoría</label>
          </div>
        </div>
       
        <div className="w-full flex flex-1 flex-col mt-5 pl-3">
          <div className="flex flex-col p-1 mt-3 relative">
            <input ref={inputRefDate} type="date" name="newsDate" className={`inputCamp peer w-40 ${emptyDate ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNewsDate(value.currentTarget.value)
                setEmptyDate(false)
              }} onKeyUp={(e) => {
                if ((e.code === "NumpadEnter")) {
                  if (txtAreaRef.current != null) {
                    txtAreaRef.current.focus()
                  }
                }
              }} />
            <label className={"labelFloatDate"}>Fecha</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="flex flex-col p-1 relative mt-3">
            <textarea ref={txtAreaRef} placeholder=" " name="newsDescription" rows={3} className={`inputCamp peer ${emptyDescption ? 'border-red-600'
              : ''
              }`} onChange={(value) => {
                setNewsDescription(value.currentTarget.value)
                setEmptyDescription(false)
              }} onKeyDown={(e) => {
                if (e.code === "NumpadEnter") {
                  if (inputRefLink.current != null) {
                    inputRefLink.current.focus()
                  }
                }
              }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
            <label className={"labelFloatTxtArea"}>Descripción</label>
          </div>
        </div>
        <div className="w-full flex flex-1 flex-col pl-3">
          <div className="text-left p-1 ">
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
        <div className="flex m-auto justify-center left-0 right-0 p-3 bottom-1">
          <button ref={btnRef} name="pharmacyBtnSave" className="btnStandard mr-10" onClick={addNews}>Publicar</button>
          <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default observer(CreateNews)