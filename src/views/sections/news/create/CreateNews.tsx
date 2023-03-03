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

  const arrayServiceTypes = [{
    "id": "checkOne",
    "value": "General",
    "title": "General",
}, {
    "id": "checkTwo",
    "value": "Tecnología",
    "title": "Tecnología",
},
{
  "id": "checkThree",
  "value": "Salud",
  "title": "Salud",
}
 ]

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

 function addNews(e: any) {
    const news: News = {
        category: newsCategory,
        title: newsTitle,
        description: newsDescription,
        publicationDate: newsDate
    } 
    
    if(newsStore.getNews.title === news.title){
      toast.info('Ya existe esta noticia', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
    }else{
      chekIfEmpty()
        if(newsCategory === '' || newsTitle === '' || newsDate === '' || file === undefined){
          toast.info('Rellene los campos', {
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
        newsStore.addRequestNews('Bolea', news, file!!)
        }
    }
  }
  function chekIfEmpty() {
    newsCategory === "" ? setEmptyCategory(true) : setEmptyCategory(false)
    newsTitle === "" ? setEmptyTitle(true) : setEmptyTitle(false)
    file === undefined ? setEmptyFile(true) : setEmptyFile(false)
    newsDate === "" ? setEmptyDate(true) : setEmptyDate(false)
    newsDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
   
}

const [emptyCategory, setEmptyCategory] = useState(false)
const [emptyTitle, setEmptyTitle] = useState(false)
const [emptyFile, setEmptyFile] = useState(false)
const [emptyDate, setEmptyDate] = useState(false)
const [emptyDescption, setEmptyDescription] = useState(false)


  return (
    <div className="flex flex-col md:m-auto w-full md:w-1/2 md:h-screen border-2 rounded-md bg-white">
      <div>
      <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
        <div className="w-full flex flex-row p-2 justify-between">
          <img src={logoEtno} alt="logo_Etno"></img>
          <p className='flex  text-white text-3xl p-3'>NOTICIAS</p>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-8 pl-3">
      <div className={`rounded-md border-2  ${emptyCategory ? 'border-red-600'
                        : ''
                        }`}>
                    <div className="flex flex-col p-1 relative">
                        <div className="flex  flex-wrap">
                            {arrayServiceTypes.map((chkBtn, index) => (
                                <div key={index} className='flex lg:w-1/6 w-1/3'>
                                    <input type="radio" id={chkBtn.id} name="tipeCheck" className="sr-only peer" value={chkBtn.value} onChange={(e) => {
                                        setNewsCategory(e.currentTarget.value)
                                        setEmptyCategory(false)
                                    }} />
                                    <label htmlFor={chkBtn.id} className="w-full  text-center uppercase cursor-pointer  p-2 mr-3 my-2 font-medium text-xs rounded-md peer-checked:bg-indigo-800 border 
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
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1 mt-3 relative">

          <input ref={inputRefTit} placeholder=" " name="newsTitle" type="text" className={`inputCamp peer ${emptyTitle ? 'border-red-600'
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
            }} />
          <label className={"labelFloatInput"}>Titulo</label>
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
            }} />
          <label className={"labelFloatTxtArea"}>Descripción</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="text-left p-1 ">
          <div className={`photoBoard ${emptyFile? 'border-red-600'
                        : ''
                        }`}>
            <div className='absolute left-3'>
              Foto {file?.name}
            </div>
            <form id="form-file-upload" className=" w-full flex justify-center ">
              <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} 
              accept=".png, .JPG, .jpg, .gif, .jpeg" 
              onChange={(value) => {
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
      <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
        <button ref={btnRef} name="pharmacyBtnSave" className="btnStandard mr-10" onClick={addNews}>Publicar</button>
        <button name="pharmacyBtnCancel" className="btnStandard" onClick={() => newsStore.setModalCreate(false)}>Cancelar</button>
      </div>
      </div>

    </div>
  )
}
export default observer(CreateNews)