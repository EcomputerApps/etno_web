import { makeObservable, action, computed, observable } from "mobx";
import { Image, PaginatedImages } from '../../models/section/Section'
import { resizeFile, urlBase } from "../../utils/global";

class ImageStore {
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
        const response = await fetch(`${urlBase}/images/paginated?locality=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const iamges = await response.json()
        console.log(iamges)
        this.updatePaginateImages(iamges)
    }

    async addImageAPI(locality: string, section: string, category: string, file: File){
        let data = new FormData()
        const imageFile = await resizeFile(file)
        
        data.append('image', imageFile)

        const request = await fetch(`${urlBase}/images?section=${section}&category=${category}&username=${locality}`, {
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