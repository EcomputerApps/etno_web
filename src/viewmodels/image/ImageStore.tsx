import { makeObservable, action, computed, observable } from "mobx";
import { Image, PaginatedImages } from '../../models/section/Section'

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
    paginateImages : PaginatedImages = {}

    constructor() {
        makeObservable(this, {
            paginateImages: observable,
            image: observable,
            getRequestImages: action,
            updateImagesList: action,
            updatePaginateImages: action,
            addImageAPI: action,
            updateImage: action,
            getImage: computed,
            getPaginatedImages: computed
        })
    }

    get getPaginatedImages(){
        return this.paginateImages
    }
    updateImagesList(images: Image[]){
        this.paginateImages.content= images
    }
    updatePaginateImages(paginateImages: PaginatedImages) {
        this.paginateImages = paginateImages
    }
    async getRequestImages(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/images?locality=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const iamges = await response.json()
        this.updatePaginateImages(iamges)
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