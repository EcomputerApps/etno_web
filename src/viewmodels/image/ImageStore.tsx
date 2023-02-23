import { makeObservable, action, computed, observable } from "mobx";
import { Image } from '../../models/section/Section'

class ImageStore {
    serverIp = '192.168.241.51'
    static imageStore: ImageStore

    static getImageStore(){
        if(this.imageStore === undefined){
            this.imageStore = new ImageStore()
        }
        return this.imageStore
    }
    image: Image = {}

    constructor() {
        makeObservable(this, {
            image: observable,
            addImageAPI: action,
            updateImage: action,
            getImage: computed
        })
    }

    async addImageAPI(locality: string, section: string, category: string, file: File){
        let data = new FormData()
        data.append('image', file)

        const request = await fetch(`http://${this.serverIp}:8080/images?section=${section}&category=${category}&username=${locality}`, {
            method: 'POST',
            body: data
        })

        if(request.ok){
            const response = await request.json()
            this.updateImage(response)
        }
    }
    
    updateImage(image: Image){
        this.image = image
    }
    get getImage(){
        return this.image
    }
}
export default ImageStore