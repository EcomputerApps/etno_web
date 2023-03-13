import { computeHeadingLevel } from "@testing-library/react"
import { action, computed, makeAutoObservable, observable } from "mobx"
import { Survey } from "../../models/section/Section"

class SurveyStore {
    serverIp: string = "192.168.241.51"
    static surveyStore: SurveyStore

    static getSurveyStore() {
        if (this.surveyStore === undefined) {
            this.surveyStore = new SurveyStore()
        }
        return this.surveyStore
    }

    modalCreateSurvey: boolean = false
    modalEditSurvey : boolean = false
    survey: Survey = {}


    constructor() {
        makeAutoObservable(this, {
            survey: observable,
            modalCreateSurvey: observable,
            modalEditSurvey: observable,
            updateSurvey: action,
            setCreateSurvey: action,
            setEditSurvey: action,
            getSurvey: computed,
            getCreateSurvey: computed,
            getEditSurvey: computed
        })
    }
    updateSurvey(survey: Survey) {
        this.survey = survey
    }
    get getSurvey() {
        return this.survey
    }
    setCreateSurvey(mode: boolean) {
        this.modalCreateSurvey = mode
    }
    get getCreateSurvey() {
        return this.modalCreateSurvey
    }
    setEditSurvey(mode: boolean) {
        this.modalEditSurvey = mode
    }
    get getEditSurvey() {
        return this.modalEditSurvey
    }


} export default SurveyStore