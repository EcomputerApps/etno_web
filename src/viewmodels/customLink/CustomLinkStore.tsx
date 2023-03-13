import { action, computed, makeAutoObservable, observable } from "mobx"
import { observer } from "mobx-react-lite"
import { CustomLink } from "../../models/section/Section"

class CustomLinkStore {
    static personalLinkStore: CustomLinkStore

    static getCustomLinkStore() {
        if (this.personalLinkStore === undefined) {
            this.personalLinkStore = new CustomLinkStore
        }
        return this.personalLinkStore
    }

    modalCreateLink: boolean = false
    modalEditLink: boolean = false
    customLink: CustomLink = {}

    constructor() {
        makeAutoObservable(this, {
            customLink: observable,
            modalCreateLink: observable,
            modalEditLink: observable,
            updatePersonalLink: action,
            setCreateLinkModal: action,
            setEditLinkModal: action,
            getPersonalLink: computed,
            getCreateLinkModal: computed,
            getEditLinkModal: computed
        })
    }
    updatePersonalLink(link: CustomLink) {
        this.customLink = link
    }
    get getPersonalLink() {
        return this.customLink
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


}
export default CustomLinkStore