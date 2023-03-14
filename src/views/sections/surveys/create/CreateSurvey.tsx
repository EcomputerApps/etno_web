import logoEtno from '../../../../assets/logo_etno.png'
import { observer } from "mobx-react-lite"
import SurveyStore from "../../../../viewmodels/survey/SurveyStore"
import { useState } from 'react'
import { Survey } from '../../../../models/section/Section'
import { toast } from 'react-toastify'

const surveyStore = SurveyStore.getSurveyStore()
const CreateSurvey = () => {
    const [question, setQuestion] = useState<string>("")
    const [finalDate, setFinalDate] = useState<string>("")
    const [finalTime, setFinalTime] = useState<string>("")
    const [answerOne, setAnswerOne] = useState<string>("")
    const [answerTwo, setAnswerTwo] = useState<string>("")
    const [answerThree, setAnswerThree] = useState<string>("")
    const [answerFour, setAnswerFour] = useState<string>("")

    function addSurvey() {
        const newSurvey: Survey = {
            question: question,
            closeDate: finalDate,
            closeTime: finalTime,
            replies: [answerOne, answerTwo, answerThree, answerFour]

        }
        chekIfEmpty()
        question === "" || finalDate === "" || finalTime === "" ||
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
            }) : surveyStore.updateSurvey(newSurvey)

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

    const [emptyName, setEmptyName] = useState(false)
    const [emptyDate, setEmptyDate] = useState(false)
    const [emptyTime, setEmptyTime] = useState(false)
    const [emptyReplies, setEmptyReplies] = useState(false)

    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2  w-3/4 lg:h-screen border-2 rounded-md bg-white">
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
                                }`} onChange={(e) => { setQuestion(e.currentTarget.value) }} />
                        <label className="labelFloatInput">Pregunta</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3 pb-7 pt-7">
                    <div className="flex pt-2  p-1  relative">
                        <input type="date" className={`inputCamp peer  w-40 mr-1 ${emptyDate ? 'border-red-600'
                            : ''
                            }`}
                            onChange={(e) => { setFinalDate(e.currentTarget.value) }} />
                        <input type="time" className={`inputCamp peer w-40 ${emptyTime ? 'border-red-600'
                            : ''
                            }`}
                            onChange={(e) => { setFinalTime(e.currentTarget.value) }} />
                        <label className={"labelFloatDate"}>Fecha de Cierre</label>
                    </div>
                </div>
                <div className={`border-t-2 border-b-2 rounded-md pb-5 ${emptyReplies ? 'border-red-600'
                    : ''
                    }`}>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text"
                                className="inputCamp peer" onChange={(e) => { setAnswerOne(e.currentTarget.value) }} />
                            <label className="labelFloatInput">Respuesta 1</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text"
                                className="inputCamp peer" onChange={(e) => { setAnswerTwo(e.currentTarget.value) }} />
                            <label className="labelFloatInput">Respuesta 2</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text"
                                className="inputCamp peer" onChange={(e) => { setAnswerThree(e.currentTarget.value) }} />
                            <label className="labelFloatInput">Respuesta 3</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text"
                                className="inputCamp peer" onChange={(e) => { setAnswerFour(e.currentTarget.value) }} />
                            <label className="labelFloatInput">Respuesta 4</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center font-medium text-red-600 text-xl'>
                {emptyReplies ? "Minimo 2 respuestas" : ""}
            </div>
            <div className="lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => addSurvey()}>Publicar</button>
                <button name="bandBtnCancel" className="btnStandard" onClick={() => surveyStore.setCreateSurvey(false)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(CreateSurvey)