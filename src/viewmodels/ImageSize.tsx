import { makeObservable, action, computed, observable } from "mobx";

class ImageSize {
    static imageSize: ImageSize

    static getImageSize() {
        if (this.imageSize === undefined) {
            this.imageSize = new ImageSize()
        }
        return this.imageSize
    }

    imgModalLink: string = ''
    fotoPageStart: number = 0
    fotoPageFin: number = 6

    constructo() {
        makeObservable(this, {
            imgModalLink: observable,
            fotoPageStart: observable,
            fotoPageFin: observable,
            setLink: action,
            getLink: computed,
            getFPS: computed,
            getFPF: computed,
        })
    }

    setLink(newLink: string) {
        this.imgModalLink = newLink
    } setFotoPageStart(newFPS: number) {
        this.fotoPageStart = newFPS
    }
    setFotoPageFin(newFPF: number) {
        this.fotoPageFin = newFPF
    }
    get getLink() {
        return this.imgModalLink
    }
    get getFPS() {
        return this.fotoPageStart
    }
    get getFPF() {
        return this.fotoPageFin
    }

}

export default ImageSize