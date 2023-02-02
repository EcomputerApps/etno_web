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
        section: 'Eventos',
        open: true,
        menu: 
    [
        {title: 'Noticias', src: "new.svg"},
        {title: 'Turismo', src: "tourism.svg", gap: true},
        {title: 'Eventos', src: "event.svg"},
        {title: 'Bandos', src: "bando.svg"},
        {title: 'Framacias', src: "new.svg", gap: true},
        {title: 'Servicios', src: "service.svg"},
        {title: 'Patrocinadores', src: "sponsor.svg"},
        {title: 'Fallesimientos', src: "new.svg", gap: true},
       
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