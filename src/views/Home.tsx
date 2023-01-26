import { useState } from 'react'
import Event from './sections/Event'
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { panelHandler, updateSection} from "../features/sidebar/panels_slice"
import arrowLogo from '../assets/control.png'
import etnoLogo from '../assets/logo_etno.png'
import 'tailwindcss/tailwind.css'
import Tourism from './sections/Tourism'
import Bandos from './sections/Bandos'
import Services from './sections/Services'
import Sponsors from './sections/Sponsors'
import News from './sections/News'

const Home = () => {
    const dispatcher = useAppDispatch()
    const {open, menu, section} = useAppSelector(state => state.panelStore)

    const [hoverIndexed, setHoverIndexed] = useState<number>(0)

  function renderView(): JSX.Element | undefined{
      switch(section){
        case 'Eventos': return <Event/>
        case 'Turismo': return <Tourism/>
        case 'Bandos': return <Bandos/>
        case 'Servicios': return <Services/>
        case 'Patrocinadores': return <Sponsors/>
        case 'Noticias': return <News/>
      }
  }

  return(
        <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={arrowLogo}
          alt = 'arrow'
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => dispatcher(panelHandler())}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={etnoLogo}
            alt='etno'
            className={`cursor-pointer duration-500 w-8 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            ETNO
          </h1>
        </div>
        <ul className="pt-6">
          {menu.map((item, index) => (
            <li onClick={ () => {dispatcher(updateSection(item.title)); setHoverIndexed(index) }}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${item.gap ? "mt-9" : "mt-2"} ${
                index === hoverIndexed && "bg-light-white"
              } `}
            >
              <img className="w-7 h-7" src={require(`../assets/menu/${item.src}`)} alt={item.title}/>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
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
export default Home