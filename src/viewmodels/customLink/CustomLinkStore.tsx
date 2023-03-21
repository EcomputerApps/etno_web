import { action, computed, makeAutoObservable, observable } from "mobx"
import { observer } from "mobx-react-lite"
import { toast } from "react-toastify"
import { CustomLink, CustomLinkList, PaginatedCustomLink } from "../../models/section/Section"


class CustomLinkStore {
    serverIp: string = "192.168.241.51"
    static customLinkStore: CustomLinkStore

    static getCustomLinkStore() {
        if (this.customLinkStore === undefined) {
            this.customLinkStore = new CustomLinkStore
        }
        return this.customLinkStore
    }

    modalCreateLink: boolean = false
    modalEditLink: boolean = false
    customLink: CustomLink = {}
    allCustomLinks: CustomLinkList = {}
    paginatedCustomLink: PaginatedCustomLink = {}

    constructor() {
        makeAutoObservable(this, {
            allCustomLinks: observable,
            customLink: observable,
            paginatedCustomLink: observable,
            modalCreateLink: observable,
            modalEditLink: observable,
            updateCustomLinkList: action,
            updateCustomLink: action,
            getAllCustomLinksRequest:action,
            getPaginatedCLinkRequest:action,
            updatePaginatedCustomLink: action,
            setCreateLinkModal: action,
            setEditLinkModal: action,
            getCustomlLink: computed,
            getCreateLinkModal: computed,
            getEditLinkModal: computed,
            getPaginatedCustomLink: computed,
            updateAllCustomLinks: action,
            getAllCustomLinks: computed

        })
    }
    updateAllCustomLinks(customLinks: CustomLink[]) {
        this.allCustomLinks.customLinks = customLinks
    }
    get getAllCustomLinks() {
        return this.allCustomLinks
    }
    updateCustomLinkList(link: CustomLink[]) {
        this.paginatedCustomLink.content = link
    }

    updateCustomLink(customLink: CustomLink) {
        this.customLink = customLink
    }
    get getCustomlLink() {
        return this.customLink
    }
    updatePaginatedCustomLink(pagLink: PaginatedCustomLink) {
        this.paginatedCustomLink = pagLink
    }
    get getPaginatedCustomLink() {
        return this.paginatedCustomLink
    }
    setCreateLinkModal(mode: boolean) {
        this.modalCreateLink = mode
    }
    get getCreateLinkModal() {
        return this.modalCreateLink
    }
    setEditLinkModal(mode: boolean) {
        this.modalEditLink = mode
    }
    get getEditLinkModal() {
        return this.modalEditLink
    }
    async addRequestCustomLink(username: string, cutomLink: CustomLink) {

        const response = await fetch(`http://${this.serverIp}:8080/users/add/custom_link?username=${username}`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Access-Control-Allow-Origin': '*'

                },
                body: JSON.stringify(cutomLink)
            })
        if (response.ok) {
            this.customLink = cutomLink
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setTimeout(function () {
                window.location.reload();
            }, 1500);
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
    async getPaginatedCLinkRequest(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/custom_links/paginated?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const link = await response.json()
        this.updatePaginatedCustomLink(link)
    }

    async getAllCustomLinksRequest(locality: string) {
        const response = await fetch(`http://${this.serverIp}:8080/custom_links?username=${locality}`, {
            method: 'GET',
        })
        const link = await response.json()
        this.updateAllCustomLinks(link)
    }

    async deleteCustomLink(username: string, idCustomLink: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/remove/custom_link?username=${username}&idCustomLink=${idCustomLink}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newLinks = this.paginatedCustomLink.content!!.filter((item) => item.idCustomLink !== idCustomLink)
            this.updateCustomLinkList(newLinks)
            this.updateCustomLink({})
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
    async editCustomLink(locality: string, customLinkId: string, customLink: CustomLink) {

        const response = await fetch(`http://${this.serverIp}:8080/users/update/custom_link?username=${locality}&idCustomLink=${customLinkId}`, {
            method: 'PUT',
            body: JSON.stringify(customLink),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (response.ok) {
            toast.success('Se ha actualizado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        } else {
            toast.error('No se ha actualizado', {
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


}
export default CustomLinkStore