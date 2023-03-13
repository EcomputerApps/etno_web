import { makeObservable, action, computed, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { PanelHandler } from "../../models/panel/Panel";

class SideBarStore{
    static sideBarStore: SideBarStore

    static getSideBarStore(){
        if(this.sideBarStore === undefined){
            this.sideBarStore = new SideBarStore()
        }
        return this.sideBarStore
    }

    panel: PanelHandler = {
        section: 'Noticias',
        open: true,
        menu: 
    [
        {title: 'Noticias', src: "new.svg"},
        {title: 'Anuncios', src: "advert.svg"},
        {title: 'Turismo', src: "tourism.svg"},
        {title: 'Eventos', src: "event.svg" },
        {title: 'Reservas', src: "reserv.svg"},
        {title: 'Bandos', src: "bando.svg"},
        {title: 'Farmacias', src: "pharmacy.svg"},
        {title: 'Servicios', src: "service.svg"},
        {title: 'Patrocinadores', src: "sponsor.svg" },
        {title: 'Fallecimientos', src: "death.svg"},
        {title: 'Encuestas', src: "death.svg"},
        {title: 'Enlaces', src: "link.svg"},
        {title: 'Enlaces Personalizados', src: "death.svg"},
        {title: 'Incidencias', src: "incident.svg"},
        {title: 'Fotos', src: "photos.svg"},
        {title: 'Salir', src: "logout.svg"},
    ]}

    constructor(){
        makeObservable(this, {
            panel: observable,
            panelHandler: action,
            updateOpen: action,
            updateSection: action,
            getPanel: computed
        })
       makePersistable(this,{ name: 'SideBarStore_v2', properties: ['panel'], storage: window.localStorage })
    }

    panelHandler(){
        this.panel.open ? this.updateOpen(false) : this.updateOpen(true)
    }

    updateOpen(open: boolean){
        this.panel.open = open
    }
    updateSection(section: string){
        this.panel.section = section
    }

    get getPanel(){
        return this.panel
    }
}
export default SideBarStore