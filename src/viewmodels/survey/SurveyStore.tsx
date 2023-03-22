import { computeHeadingLevel } from "@testing-library/react"
import { action, computed, makeAutoObservable, observable } from "mobx"
import { toast } from "react-toastify"
import { QuizResult, PaginatedQuizResult, Survey } from "../../models/section/Section"

class SurveyStore {
    serverIp: string = "192.168.137.1"
    static surveyStore: SurveyStore

    static getSurveyStore() {
        if (this.surveyStore === undefined) {
            this.surveyStore = new SurveyStore()
        }
        return this.surveyStore
    }


    modalCreateSurvey: boolean = false
    modalEditSurvey: boolean = false
    modalResults: boolean = false
    modalDetails: boolean = false
    survey: Survey = {}
    quizResult: QuizResult = {}
    paginatedQuizResults: PaginatedQuizResult = {}


    constructor() {
        makeAutoObservable(this, {
            modalDetails: observable,
            quizResult: observable,
            paginatedQuizResults: observable,
            survey: observable,
            modalResults: observable,
            modalCreateSurvey: observable,
            modalEditSurvey: observable,
            updateSurvey: action,
            setCreateSurvey: action,
            setEditSurvey: action,
            getSurvey: computed,
            getCreateSurvey: computed,
            getEditSurvey: computed,
            setModalResult: action,
            getModalRresult: computed,
            setModalDetails: action,
            getModalDetails: computed,
            getPaginatedQuizResults: computed,
            updatePaginatedQuizResults: action,
            updateQuizResult: action,
            updateQuizResults: action,
            getQuizResult: computed


        })
    }
    setModalDetails(mode: boolean) {
        this.modalDetails = mode
    }
    get getModalDetails() {
        return this.modalDetails
    }
    updateQuizResult(quizResult: QuizResult) {
        this.quizResult = quizResult
    }
    get getQuizResult() {
        return this.quizResult
    }
    updateQuizResults(quizResult: QuizResult[]) {
        this.paginatedQuizResults.content = quizResult
    }
    updatePaginatedQuizResults(quizResult: PaginatedQuizResult) {
        this.paginatedQuizResults = quizResult
    }
    get getPaginatedQuizResults() {
        return this.paginatedQuizResults
    }

    updateSurvey(survey: Survey) {
        this.survey = survey
    }
    get getSurvey() {
        return this.survey
    }
    setModalResult(mode: boolean) {
        this.modalResults = mode
    }
    get getModalRresult() {
        return this.modalResults
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
    async addRequestSurvey(username: string, survey: Survey) {

        const response = await fetch(`http://${this.serverIp}:8080/users/add/quiz?username=${username}`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Access-Control-Allow-Origin': '*'

                },
                body: JSON.stringify(survey)
            })
        if (response.ok) {
            this.survey = survey
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
    async getPaginatedResultsRequest(username: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/quiz_results/paginated?username=${username}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const results = await response.json()
        this.updatePaginatedQuizResults(results)
    }
    async getRequestSurvey() {
        const response = await fetch(`http://${this.serverIp}:8080/quizzes`, {
            method: 'GET'
        })
        const newSurvey = await response.json()
        this.updateSurvey(newSurvey[0])
    }
    async editSurvey(locality: string, surveyId: string, survey: Survey) {
        const response = await fetch(`http://${this.serverIp}:8080/users/update/quiz?username=${locality}&idQuiz=${surveyId}`, {
            method: 'PUT',
            body: JSON.stringify(survey),
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
    async deleteSurvey(username: string, idQuiz: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/remove/quiz?username=${username}&idQuiz=${idQuiz}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
        if (response.ok) {
            toast.success('Se ha borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 100,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setTimeout(function () {
                window.location.reload();
            }, 500);
        } else {
            toast.error('No se ha podido eliminar', {
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
} export default SurveyStore