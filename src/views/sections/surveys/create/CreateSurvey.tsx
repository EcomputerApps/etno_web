import logoEtno from '../../../../assets/logo_etno.png'
import { observer } from "mobx-react-lite"
import SurveyStore from "../../../../viewmodels/survey/SurveyStore"
import { useState } from 'react'
import { Survey } from '../../../../models/section/Section'
import { toast } from 'react-toastify'

const surveyStore = SurveyStore.getSurveyStore()
const CreateSurvey = () => {
    const [question, setQuestion] = useState<string>()
    const [finalDate, setFinalDate] = useState<string>()
    const [finalTime, setFinalTime] = useState<string>()
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
        question === "" || finalDate === "" || finalTime === "" ||
            answerOne === "" && answerTwo === "" && answerThree === "" &&
            answerFour === "" ?
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
        surveyStore.setCreateSurvey(false)

    }

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
                            className="inputCamp peer" onChange={(e) => { setQuestion(e.currentTarget.value) }} />
                        <label className="labelFloatInput">Pregunta</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3 pb-7 pt-7">
                    <div className="flex pt-2  p-1  relative">
                        <input type="date" className="inputCamp peer w-40 px-2 mt-0.5 h-11 disabled:bg-gray-200 disabled:border-gray-300"
                            onChange={(e) => { setFinalDate(e.currentTarget.value) }} />
                        <input type="time" className="inputCamp peer w-40 px-2 mt-0.5 h-11 disabled:bg-gray-200 disabled:border-gray-300"
                            onChange={(e) => { setFinalTime(e.currentTarget.value) }} />
                        <label className={"labelFloatDate"}>Fecha de Cierre</label>
                    </div>
                </div>
                <div className='border-t-2 border-b-2 rounded-md pb-5'>
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
            <div className="md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button name="bandBtnSave" className="btnStandard mr-10" onClick={() => addSurvey()}>Publicar</button>
                <button name="bandBtnCancel" className="btnStandard" onClick={() => surveyStore.setCreateSurvey(false)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(CreateSurvey)