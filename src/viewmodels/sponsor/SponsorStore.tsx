import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { PaginatedSponsor, Sponsor } from "../../models/section/Section";
import ImageStore from "../image/ImageStore";

const imageStore = ImageStore.getImageStore()

class SposnsorStore {
    serverIp : string = "192.168.137.1"
    static sponsorStore: SposnsorStore

    static getSponsorStore() {
        if (this.sponsorStore === undefined) {
            this.sponsorStore = new SposnsorStore()
        }
        return this.sponsorStore
    }

    //Observables =>
    paginatedSponsor: PaginatedSponsor = {}
    sponsor: Sponsor = {}


    constructor() {
        makeObservable(this, {
            paginatedSponsor: observable,
            sponsor: observable,
            updateSponsor: action,
            getSponsor: computed,
            getRequestSponsor: action,
            addRequestSponsor: action,
            deleteSponsor: action,
            updatePaginatedSponsor: action,
            updateSponsorList: action,
            getPaginatedSponsor: computed

        })
    }
    updateSponsorList(sponsors: Sponsor[]) {
        this.paginatedSponsor.content = sponsors
    }

    updatePaginatedSponsor(paginatedSponsor: PaginatedSponsor) {
        this.paginatedSponsor = paginatedSponsor
    }
    get getPaginatedSponsor() {
        return this.paginatedSponsor
    }
    updateSponsor(sponsor: Sponsor) {
        this.sponsor = sponsor
    }
    get getSponsor() {
        return this.sponsor
    }


    async getRequestSponsor(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/sponsors?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const sponsor = await response.json()
        this.updatePaginatedSponsor(sponsor)
    }

    async deleteSponsor(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/sponsor?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newSponsors = this.paginatedSponsor.content!.filter((item) => item.title !== title)
            this.updateSponsorList(newSponsors)
            this.updateSponsor({})
            toast.success('Se ha borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            toast.error('No se ha podido borrar', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
    }

    async addRequestSponsor(username: string, sponsor: Sponsor, file: File) {
        await imageStore.addImageAPI('Bolea', 'patrocinador', 'patrocinador', file)
        sponsor.imageUrl = imageStore.getImage.link
        const response = await fetch(`http://${this.serverIp}:8080/users/add/sponsor?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(sponsor)
        })
        if (response.ok) {
            this.paginatedSponsor.content?.push(sponsor)
            this.sponsor = sponsor
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            toast.error('No se ha añadido correctamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
    }


}

export default SposnsorStore