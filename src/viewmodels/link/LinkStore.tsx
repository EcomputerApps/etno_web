import { makeObservable, action, computed, observable } from "mobx";
import { Link, PaginatedLink } from "../../models/section/Section";


class LinkStore {
    serverIp : string = "192.168.241.51"
    static linkStore: LinkStore

    static getLinkStore() {
        if (this.linkStore === undefined) {
            this.linkStore = new LinkStore()
        }
        return this.linkStore
    }

    //Observable =>
    paginatedLink: PaginatedLink = {}
    title: string = ""
    link: string = ""

    constructor() {
        makeObservable(this, {
            paginatedLink: observable,
            title: observable,
            link: observable,
            setTitle: action,
            setLink: action,
            getRequestLink: action,
            addRequestLink: action,
            updateLinkList: action,
            updatePaginatedLink: action,
            getPaginatedLink: computed,
            getTitle: computed,
            getLink: computed
        })
    }
    setTitle(title: string) {
        this.title = title
    }
    setLink(link: string) {
        this.link = link
    }
    get getTitle() {
        return this.title
    }
    get getLink() {
        return this.link
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
    async getRequestLink(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/links?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const link = await response.json()
        //console.log
        console.log(link)
        this.updatePaginatedLink(link)

    }
    async deleteLink(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/link?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newLinks = this.paginatedLink.content!!.filter((item) => item.title !== title)
        this.updateLinkList(newLinks)
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
        }
    }
}
export default LinkStore