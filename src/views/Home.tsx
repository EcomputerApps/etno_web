import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import arrowLogo from '../assets/control.png'
import etnoLogo from '../assets/logo_etno.png'
import HoverSectionStore from '../viewmodels/hoverSection/HoverSectionStore'
import SideBarStore from '../viewmodels/sidebar/SideBarStore'
import Advert from './sections/advert/Advert'
import Band from './sections/bands/Band'
import Event from './sections/event/Event'
import Incident from './sections/incident/Incident'
import LinkPage from './sections/link/LinkPage'
import Necrologue from './sections/necrologue/Necrologue'
import News from './sections/news/News'
import Pharmacy from './sections/pharmacy/Pharmacy'
import Photo from './sections/photo/Photo'
import ReservMain from './sections/reserv/ReservMain'
import Service from './sections/service/Service'
import Sponsor from './sections/sponsor/Sponsor'
import Tourism from './sections/tourism/Tourism'
import UserStore from '../viewmodels/User/UserStore'
import { useEffect } from 'react'
import ReserveStore from '../viewmodels/reserv/ReserveStore'
import Survey from './sections/surveys/Survey'
import CustomLinkPage from './sections/customLink/CustomLink'

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const reserveStore = ReserveStore.getReserveStore()
const userStore = UserStore.getUserStore()


const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token_user_etno') === null){
      navigate('/')
    }
  }, [])


  function salida() {
    if (hoverSectionStore.getName === "Salir") {
      hoverSectionStore.setName(sideBarStore.panel.section)
      navigate("/logout")
    }
  }

  function renderView(): JSX.Element | undefined {
    switch (sideBarStore.getPanel.section) {
      case 'Eventos': return <Event />
      case 'Reservas': return <ReservMain />
      case 'Turismo': return <Tourism />
      case 'Bandos': return <Band />
      case 'Farmacias': return <Pharmacy />
      case 'Servicios': return <Service />
      case 'Patrocinadores': return <Sponsor />
      case 'Noticias': return <News />
      case 'Anuncios': return <Advert />
      case 'Fallecimientos': return <Necrologue />
      case 'Incidencias': return <Incident />
      case 'Fotos': return <Photo />
      case 'Enlaces': return <LinkPage />
      case 'Encuestas': return <Survey />
      case 'Enlaces Personalizados': return <CustomLinkPage />
    }
  }

  return (
    <div className="flex">
      <div
        className={` ${sideBarStore.getPanel.open ? "w-72" : "w-24"
          } bg-indigo-800 lg:h-screen h-full p-5  pt-8 relative duration-300 `}
      >
        <img
          src={arrowLogo}
          alt='arrow'
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!sideBarStore.getPanel.open && "rotate-180"}`}
          onClick={() => sideBarStore.panelHandler()}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={etnoLogo}
            alt='etno'
            className={`cursor-pointer duration-500 w-8 ${sideBarStore.getPanel.open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!sideBarStore.getPanel.open && "scale-0"
              }`}
          >
            ETNO
          </h1>
        </div>
        <ul className="pt-6">
          {sideBarStore.getPanel.menu.map((item, index) => (
            <li onClick={() => { sideBarStore.updateSection(item.title) }} onClickCapture={() => hoverSectionStore.setName(item.title)}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${item.gap ? "mt-9" : "mt-2"} ${item.title === hoverSectionStore.getName && "bg-light-white"
                } ${hoverSectionStore.getName === "Salir" && salida()}`}
            >
              <img className="w-7 h-7" src={require(`../assets/menu/${item.src}`)} alt={item.title} />
              <span className={`${!sideBarStore.getPanel.open && "hidden"} origin-left duration-200`}>
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        {renderView()}
      </div>
    </div>
  )
}
export default observer(Home)