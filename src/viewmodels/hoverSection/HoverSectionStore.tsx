import { action, computed, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";


class HoverSectionStore{
    static support: HoverSectionStore

   static getHoverSectionStore(){
        if(this.support === undefined){
            this.support = new HoverSectionStore()
        }
        return this.support
    }

     name : string = "Noticias"

     constructor(){
        makeObservable(this, {
            name : observable,
            setName : action,
            getName: computed
        })
        makePersistable(this, {
            name: 'hoverSectionStore',
            properties: ['name'],
            storage: window.localStorage
        })
     }

     setName(name : string){
        this.name = name
     }
     get getName(){
        return this.name
    }

}

export default HoverSectionStore