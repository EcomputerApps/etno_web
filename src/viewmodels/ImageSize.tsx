import { makeObservable, action, computed, observable } from "mobx";

class ImageSize{
    static imageBig: ImageSize

    static getImageSize(){
        if(this.imageBig === undefined){
            this.imageBig = new ImageSize()
        }
        return this.imageBig
    }

    imgModalStatus : boolean = false
    imgModalLink : string = ''

    constructo(){
        makeObservable(this, {
        imgModalStatus : observable,
        imgModalLink : observable,
        setEstado : action,
        setLink : action,
        getEstado: computed,
        getLink : action,
        })
    }

    setEstado( newEstado : boolean){
        this.imgModalStatus = newEstado
    }
    get getEstado(){
        return this.imgModalStatus
    }
    setLink( newLink : string){
        this.imgModalLink = newLink
    }
    get getLink(){
        return this.imgModalLink
    }

}

export default ImageSize