import logoEtno from '../../../../assets/logo_etno.png'
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"

import NewsStore from '../../../../viewmodels/news/NewsStore'
import { News } from '../../../../models/section/Section'
import { toast, ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'

const newsStore = NewsStore.getNewsStore()

const CreateNews = () => {
  const navigate = useNavigate()

  const inputRefTit = useRef<HTMLInputElement>(null)
  const inputRefDate = useRef<HTMLInputElement>(null)
  const inputRefLink = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [newsCategory, setNewsCategory] = useState<string>("")
  const [newsTitle, setNewsTitle] = useState<string>("")
  const [newsDate, setNewsDate] = useState<string>("")
  const [newsDescription, setNewsDescription] = useState<string>("")
  const [newsLink, setNewstLink] = useState<string>("")
  const [newsPhoto, setNewsPhoto] = useState<string>("")
  const [file, setFile] = useState<File>()

  useEffect(() => {
      newsStore.getRequestNews('Bolea', 0, 5)
  }, [])

  function addNews() {
    const news: News = {
        category: newsCategory,
        title: newsTitle,
        description: newsDescription,
        publicationDate: newsDate
    } 
    
    if(newsStore.getNews.title === news.title){
      toast.info('Ya existe esta noticia', {
        position: 'top-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
    }else{
        if(newsCategory === '' || newsTitle === '' || newsDate === '' || newsLink === '' || file === undefined){
          toast.info('Rellene los campos', {
            position: 'top-center',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
        })
        } else {
          newsStore.addRequestNews('Bolea', news, file!!)
        }
    }
  }

  return (
    <div className="flex flex-col md:m-auto w-full md:w-1/2 md:h-screen border-2 rounded-md">
      <div>
      <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
        <div className="w-full flex flex-row p-2 justify-between">
          <img src={logoEtno} alt="logo_Etno"></img>
          <p className='flex  text-white text-3xl p-3'>NOTICIAS</p>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1 mt-5 relative">
          <input autoFocus placeholder=" " name="newsCategory" type="text" className="inputCamp peer" onChange={(value) => {
              setNewsCategory(value.currentTarget.value)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefTit.current != null) {
                  inputRefTit.current.focus()
                }
              }
            }} />
          <label className={"labelFloatInput"}>Categoria</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1 mt-3 relative">

          <input ref={inputRefTit} placeholder=" " name="newsTitle" type="text" className="inputCamp peer" onChange={(value) => {
              setNewsTitle(value.currentTarget.value)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefDate.current != null) {
                  inputRefDate.current.focus()
                }
              }
            }} />
          <label className={"labelFloatInput"}>Titulo</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-5 pl-3">
        <div className="flex flex-col p-1 mt-3 relative">
          <input ref={inputRefDate} type="date" name="newsDate" className="w-40 inputCamp peer" onChange={(value) => {
              setNewsDate(value.currentTarget.value)
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
          <textarea ref={txtAreaRef} placeholder=" " name="newsDescription" rows={3} className="inputCamp peer" onChange={(value) => {
              setNewsDescription(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if (e.code === "NumpadEnter") {
                if (inputRefLink.current != null) {
                  inputRefLink.current.focus()
                }
              }
            }} />
          <label className={"labelFloatTxtArea"}>Descricíon</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1 relative mt-3">
          <input ref={inputRefLink} placeholder=" " name="newsUrl" type="text" className="inputCamp peer" onChange={(value) => {
            setNewstLink(value.currentTarget.value)
          }} onKeyDown={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (btnRef.current != null) {
                btnRef.current.focus()
              }
            }
          }} />
          <label className={"labelFloatInput"}>Pagina Web</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="text-left p-1 ">
          <div className={"photoBoard"}>
            <div className='absolute left-3'>
              Foto {file?.name}
            </div>
            <form id="form-file-upload" className=" w-full flex justify-center ">
              <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                setFile(value.currentTarget.files!![0])
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
      <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
        <button ref={btnRef} name="pharmacyBtnSave" className="btnStandard mr-10" onClick={addNews}>Publicar</button>
        <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => navigate("/home")}>Cancelar</button>
      </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
export default observer(CreateNews)