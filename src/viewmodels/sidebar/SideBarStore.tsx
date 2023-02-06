import { makeObservable, action, computed, observable } from "mobx";
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
        {title: 'Anuncios', src: "new.svg"},
        {title: 'Turismo', src: "tourism.svg"},
        {title: 'Eventos', src: "event.svg" },
        {title: 'Bandos', src: "bando.svg", gap: true},
        {title: 'Framacias', src: "pharmacy.svg"},
        {title: 'Servicios', src: "service.svg"},
        {title: 'Patrocinadores', src: "sponsor.svg", gap: true},
        {title: 'Fallecimientos', src: "death.svg"},
        {title: 'Incidencias', src: "incident.svg"},
        {title: 'Fotos', src: "photos.svg"},
        {title: 'Mapa', src: "photos.svg"},
        {title: 'Salir', src: "logout.svg", gap: true},
    ]}

    constructor(){
        makeObservable(this, {
            panel: observable,
            panelHandler: action,
            updateOpen: action,
            updateSection: action,
            getPanel: computed
        })
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