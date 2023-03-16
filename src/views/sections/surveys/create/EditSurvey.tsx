import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { toast } from 'react-toastify'
import logoEtno from '../../../../assets/logo_etno.png'
import { Survey } from '../../../../models/section/Section'
import SurveyStore from "../../../../viewmodels/survey/SurveyStore"
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()



const surveyStore = SurveyStore.getSurveyStore()
const EditSurvey = () => {
    const [question, setQuestion] = useState<string>(surveyStore.getSurvey.question!!)
    const [finalDate, setFinalDate] = useState<string>("")
    const [finalTime, setFinalTime] = useState<string>("")
    const [answerOne, setAnswerOne] = useState<string>(surveyStore.getSurvey.answerOne!!)
    const [answerTwo, setAnswerTwo] = useState<string>(surveyStore.getSurvey.answerTwo!!)
    const [answerThree, setAnswerThree] = useState<string>(surveyStore.getSurvey.answerThree!!)
    const [answerFour, setAnswerFour] = useState<string>(surveyStore.getSurvey.answerFour!!)

    const [emptyName, setEmptyName] = useState(false)
    const [emptyDate, setEmptyDate] = useState(false)
    const [emptyTime, setEmptyTime] = useState(false)
    const [emptyReplies, setEmptyReplies] = useState(false)

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
                answerFour: answerFour


            }

            surveyStore.editSurvey('Bolea', surveyId, newSurvey)
            // bandStore.getRequestBand('Bolea', 0, 5)
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
                                }`} onChange={(e) => { setQuestion(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                        <label className="labelFloatInput">Pregunta</label>
                    </div>
                </div>
                <div className={`border-t-2 border-b-2 border-transparent rounded-md pb-5 ${emptyReplies ? 'border-red-600'
                    : 'border-transparent'
                    }`}>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text"
                                className="inputCamp peer" defaultValue={surveyStore.getSurvey.answerOne} onChange={(e) => { setAnswerOne(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                            <label className="labelFloatInput">Respuesta 1</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text"
                                className="inputCamp peer" defaultValue={surveyStore.getSurvey.answerTwo} onChange={(e) => { setAnswerTwo(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                            <label className="labelFloatInput">Respuesta 2</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text"
                                className="inputCamp peer" defaultValue={surveyStore.getSurvey.answerThree} onChange={(e) => { setAnswerThree(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                            <label className="labelFloatInput">Respuesta 3</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text"
                                className="inputCamp peer" defaultValue={surveyStore.getSurvey.answerFour} onChange={(e) => { setAnswerFour(e.currentTarget.value) }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')} />
                            <label className="labelFloatInput">Respuesta 4</label>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center font-medium text-red-600 text-xl'>
                    {emptyReplies ? "Minimo 2 respuestas" : ""}
                </div>
            </div>
            <div className="md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => updateSurvey(surveyStore.getSurvey.idQuiz!!)}>Guardar</button>
                <button name="bandBtnCancel" className="btnStandard" onClick={() => surveyStore.setEditSurvey(false)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(EditSurvey)