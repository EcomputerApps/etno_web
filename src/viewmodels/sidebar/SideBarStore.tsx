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
        {title: 'Eventos', src: "event.svg"},
        {title: 'Turismo', src: "tourism.svg", gap: true},
        {title: 'Bandos', src: "bando.svg"},
        {title: 'Servicios', src: "service.svg", gap: true},
        {title: 'Patrocinadores', src: "sponsor.svg"},
        {title: 'Noticias', src: "new.svg"}
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