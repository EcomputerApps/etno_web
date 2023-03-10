import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Link, PaginatedLink } from "../../models/section/Section";
import ImageStore from "../image/ImageStore";

const imageStore = ImageStore.getImageStore()

class LinkStore {
    serverIp: string = "192.168.241.51"
    static linkStore: LinkStore

    static getLinkStore() {
        if (this.linkStore === undefined) {
            this.linkStore = new LinkStore()
        }
        return this.linkStore
    }

    //Observable =>
    paginatedLink: PaginatedLink = {}
    link: Link = {}
    title: string = ""
    id: string = ""
    linkString: string = ""
    modalCreate: boolean = false
    modalEdit: boolean = false

    constructor() {
        makeObservable(this, {
            modalEdit: observable,
            modalCreate: observable,
            setModalCreate: action,
            getModalEdit: computed,
            getModalCreate: computed,
            paginatedLink: observable,
            title: observable,
            link: observable,
            id: observable,
            updateLink: action,
            getLink: computed,
            linkString: observable,
            setTitle: action,
            setLinkString: action,
            setId: action,
            getRequestLink: action,
            addRequestLink: action,
            updateLinkList: action,
            updatePaginatedLink: action,
            getPaginatedLink: computed,
            getTitle: computed,
            getId: computed,
            getLinkString: computed
        })
    }
    setModalEdit(mode: boolean) {
        this.modalEdit = mode
    }
    get getModalEdit() {
        return this.modalEdit
    }
    setModalCreate(mode: boolean) {
        this.modalCreate = mode
    }
    get getModalCreate() {
        return this.modalCreate
    }

    setTitle(title: string) {
        this.title = title
    }
    setLinkString(link: string) {
        this.linkString = link
    }
    setId(id: string) {
        this.id = id
    }
    get getTitle() {
        return this.title
    }
    get getId() {
        return this.id
    }
    get getLinkString() {
        return this.linkString
    }
    updateLinkList(links: Link[]) {
        this.paginatedLink.content = links
    }
    updatePaginatedLink(paginatedLink: PaginatedLink) {
        this.paginatedLink = paginatedLink
    }
    get getPaginatedLink() {
        return this.paginatedLink
    }
    updateLink(link: Link) {
        this.link = link
    }
    get getLink() {
        return this.link
    }
    async getRequestLink(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/links?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const link = await response.json()
        this.updatePaginatedLink(link)
    }
    async deleteLink(username: string, idLink: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/link?username=${username}&idLink=${idLink}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newLinks = this.paginatedLink.content!!.filter((item) => item.idLink !== idLink)
            this.updateLinkList(newLinks)
            this.updateLink({})
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
    async addRequestLink(username: string, link: Link) {
        const response = await fetch(`http://${this.serverIp}:8080/users/add/link?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(link)
        })
        if (response.ok) {
            this.paginatedLink.content?.push(link)
            this.link = link
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
    async editLink(locality: string, linkId: string, link: Link) {

        const response = await fetch(`http://${this.serverIp}:8080/users/update/link?username=${locality}&linkId=${linkId}`, {
            method: 'PUT',
            body: JSON.stringify(link),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (response.ok) {
            toast.success('Se ha actualizado exitosamente', {
                position: 'top-center',
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
                position: 'top-center',
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
export default LinkStore