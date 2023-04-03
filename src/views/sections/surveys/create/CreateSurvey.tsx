import logoEtno from '../../../../assets/logo_etno.png'
import { observer } from "mobx-react-lite"
import SurveyStore from "../../../../viewmodels/survey/SurveyStore"
import { useRef, useState } from 'react'
import { Survey } from '../../../../models/section/Section'
import { toast } from 'react-toastify'

const surveyStore = SurveyStore.getSurveyStore()

const CreateSurvey = () => {
    const inputDate = useRef<HTMLInputElement>(null)
    const inputTime = useRef<HTMLInputElement>(null)
    const inputAnswerOne = useRef<HTMLInputElement>(null)
    const inputAnswerTwo = useRef<HTMLInputElement>(null)
    const inputAnswerThree = useRef<HTMLInputElement>(null)
    const inputAnswerFour = useRef<HTMLInputElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [question, setQuestion] = useState<string>("")
    const [finalDate, setFinalDate] = useState<string>("")
    const [finalTime, setFinalTime] = useState<string>("")
    const [answerOne, setAnswerOne] = useState<string>("")
    const [answerTwo, setAnswerTwo] = useState<string>("")
    const [answerThree, setAnswerThree] = useState<string>("")
    const [answerFour, setAnswerFour] = useState<string>("")
    const [emptyName, setEmptyName] = useState<boolean>(false)
    const [emptyDate, setEmptyDate] = useState<boolean>(false)
    const [emptyTime, setEmptyTime] = useState<boolean>(false)
    const [emptyReplies, setEmptyReplies] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

    function addSurvey() {
        const newSurvey: Survey = {
            question: question,
            answerOne: answerOne,
            answerTwo: answerTwo,
            answerThree: answerThree,
            answerFour: answerFour,
            isActive: true,
            datePicker: new Date(finalDate + " " + finalTime)
        }
        chekIfEmpty()
        question === "" ||
            minimumReplies() ?
            toast.error('Rellene los campos', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            }) : surveyStore.addRequestSurvey(localStorage.getItem('user_etno_locality')!, newSurvey)
    }

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

    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-11/12 lg:h-screen border-2 rounded-md bg-white">
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => surveyStore.setCreateSurvey(false)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div>
                <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                    <div className="w-full flex flex-row p-2 justify-between">
                        <img src={logoEtno} alt="logo_Etno"></img>
                        <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>CREAR Encuesta </p>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3">
                    <div className=" flex flex-col p-1 mt-5  relative">
                        <input autoFocus placeholder=" "
                            name="bandType" type="text" required={true}
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
                        <input placeholder=" " ref={inputDate}
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
                        <input placeholder=" " ref={inputTime}
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
                            <input placeholder=" " ref={inputAnswerOne}
                                name="bandType" type="text"
                                className="inputCamp peer" onChange={(e) => { setAnswerOne(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}
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
                            <input placeholder=" " ref={inputAnswerTwo}
                                name="bandType" type="text"
                                className="inputCamp peer" onChange={(e) => { setAnswerTwo(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}
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
                            <input placeholder=" " ref={inputAnswerThree}
                                name="bandType" type="text"
                                className="inputCamp peer" onChange={(e) => { setAnswerThree(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} onKeyDown={(e) => {
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
                            <input placeholder=" " ref={inputAnswerFour}
                                name="bandType" type="text"
                                className="inputCamp peer" onChange={(e) => { setAnswerFour(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}
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
            </div>
            <div className='flex justify-center font-medium text-red-600 text-xl'>
                {emptyReplies ? "Minimo 2 respuestas" : ""}
            </div>
            <div className="lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button ref={btnRef} className="btnStandard mr-10" onClick={() => addSurvey()}>Publicar</button>
                <button className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(CreateSurvey)