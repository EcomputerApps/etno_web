import { observer } from 'mobx-react-lite'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import logoEtno from '../../../../assets/logo_etno.png'
import { DateTime, Survey } from '../../../../models/section/Section'
import SurveyStore from "../../../../viewmodels/survey/SurveyStore"
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import moment from 'moment'
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()



const surveyStore = SurveyStore.getSurveyStore()
const EditSurvey = () => {

    const [dateTime] = useState(surveyStore.getSurvey.datePicker as DateTime)
    const [question, setQuestion] = useState<string>(surveyStore.getSurvey.question!!)
    const [finalDate, setFinalDate] = useState<string>(moment(dateTime.value).format("YYYY-MM-DD"))
    const [finalTime, setFinalTime] = useState<string>(moment(dateTime.value).format("HH:MM"))
    const [answerOne, setAnswerOne] = useState<string>(surveyStore.getSurvey.answerOne!!)
    const [answerTwo, setAnswerTwo] = useState<string>(surveyStore.getSurvey.answerTwo!!)
    const [answerThree, setAnswerThree] = useState<string>(surveyStore.getSurvey.answerThree!!)
    const [answerFour, setAnswerFour] = useState<string>(surveyStore.getSurvey.answerFour!!)

    const [emptyName, setEmptyName] = useState(false)
    const [emptyDate, setEmptyDate] = useState(false)
    const [emptyTime, setEmptyTime] = useState(false)
    const [emptyReplies, setEmptyReplies] = useState(false)


    const inputDate = useRef<HTMLInputElement>(null)
    const inputTime = useRef<HTMLInputElement>(null)
    const inputAnswerOne = useRef<HTMLInputElement>(null)
    const inputAnswerTwo = useRef<HTMLInputElement>(null)
    const inputAnswerThree = useRef<HTMLInputElement>(null)
    const inputAnswerFour = useRef<HTMLInputElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    function minimumReplies() {
        var counter = 0
        if (answerOne !== "") {
            counter++
        } if (answerTwo !== "") {
            counter++
        } if (answerThree !== "") {
            counter++
        } if (answerFour !== "") {
            counter++
        }
        if (counter > 1) {
            return false
        } else {
            return true
        }
    }
    function chekIfEmpty() {
        question === "" ? setEmptyName(true) : setEmptyName(false)
        finalDate === "" ? setEmptyDate(true) : setEmptyDate(false)
        finalTime === "" ? setEmptyTime(true) : setEmptyTime(false)
        minimumReplies() ? setEmptyReplies(true) : setEmptyReplies(false)
    }
    function updateSurvey(surveyId: string) {
        chekIfEmpty()
        if (question === "" || minimumReplies()) {
            toast.error('Rellene los campos', {
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
            const newSurvey: Survey = {
                question: question,
                answerOne: answerOne,
                answerTwo: answerTwo,
                answerThree: answerThree,
                answerFour: answerFour,
                isActive: true,
                datePicker: new Date(finalDate + " " + finalTime)
            }
            surveyStore.editSurvey('Bolea', surveyId, newSurvey)
            sideBarStore.updateSection('Encuestas'); hoverSectionStore.setName('Encuestas')
        }
    }



    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2  w-11/12  lg:h-screen border-2 rounded-md bg-white">
            <div>
                <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                    <div className="w-full flex flex-row p-2 justify-between">
                        <img src={logoEtno} alt="logo_Etno"></img>
                        <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>editar Encuesta </p>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input autoFocus placeholder=" "
                            type="text" defaultValue={surveyStore.getSurvey.question} required={true}
                            className={`inputCamp peer ${emptyName ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => { setQuestion(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}
                            onKeyDown={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (inputDate.current != null) {
                                        inputDate.current.focus()
                                    }
                                }
                            }} />
                        <label className="labelFloatInput">Pregunta</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-row p-1 mt-5  relative">
                        <input placeholder=" " ref={inputDate} defaultValue={finalDate}
                            type="date"
                            className={`inputCamp peer ${emptyDate ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => { setFinalDate(e.currentTarget.value) }} onKeyDown={(e) => {
                                    if (e.code === "NumpadEnter") {
                                        if (inputTime.current != null) {
                                            inputTime.current.focus()
                                        }
                                    }
                                }} />
                        <input placeholder=" " ref={inputTime} defaultValue={finalTime}
                            type="time"
                            className={`inputCamp peer ${emptyTime ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => { setFinalTime(e.currentTarget.value) }} onKeyDown={(e) => {
                                    if (e.code === "NumpadEnter") {
                                        if (inputAnswerOne.current != null) {
                                            inputAnswerOne.current.focus()
                                        }
                                    }
                                }} />
                        <label className="labelFloatInput">Fecha de Cierre</label>
                    </div>
                </div>
                <div className={`border-t-2 border-b-2 border-transparent rounded-md pb-5 ${emptyReplies ? 'border-red-600'
                    : 'border-transparent'
                    }`}>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                ref={inputAnswerOne} type="text"
                                className="inputCamp peer" defaultValue={surveyStore.getSurvey.answerOne} onChange={(e) => { setAnswerOne(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}
                                onKeyDown={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (inputAnswerTwo.current != null) {
                                            inputAnswerTwo.current.focus()
                                        }
                                    }
                                }} />
                            <label className="labelFloatInput">Respuesta 1</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                ref={inputAnswerTwo} type="text"
                                className="inputCamp peer" defaultValue={surveyStore.getSurvey.answerTwo} onChange={(e) => { setAnswerTwo(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}
                                onKeyDown={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (inputAnswerThree.current != null) {
                                            inputAnswerThree.current.focus()
                                        }
                                    }
                                }} />
                            <label className="labelFloatInput">Respuesta 2</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                ref={inputAnswerThree} type="text"
                                className="inputCamp peer" defaultValue={surveyStore.getSurvey.answerThree} onChange={(e) => { setAnswerThree(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}
                                onKeyDown={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (inputAnswerFour.current != null) {
                                            inputAnswerFour.current.focus()
                                        }
                                    }
                                }} />
                            <label className="labelFloatInput">Respuesta 3</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                ref={inputAnswerFour} type="text"
                                className="inputCamp peer" defaultValue={surveyStore.getSurvey.answerFour} onChange={(e) => { setAnswerFour(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}
                                onKeyDown={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (btnRef.current != null) {
                                            btnRef.current.focus()
                                        }
                                    }
                                }} />
                            <label className="labelFloatInput">Respuesta 4</label>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center font-medium text-red-600 text-xl'>
                    {emptyReplies ? "Minimo 2 respuestas" : ""}
                </div>
            </div>
            <div className="md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button ref={btnRef} className="btnStandard mr-10" onClick={() => updateSurvey(surveyStore.getSurvey.idQuiz!!)}>Guardar</button>
                <button className="btnStandard" onClick={() => surveyStore.setEditSurvey(false)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(EditSurvey)