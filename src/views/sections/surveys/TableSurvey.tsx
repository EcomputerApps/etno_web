import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Survey } from "../../../models/section/Section"
import SurveyStore from "../../../viewmodels/survey/SurveyStore"
import EditSurvey from "./create/EditSurvey"
import surveyRed from "../../../assets/menu/surveyRed.svg"
const surveyStore = SurveyStore.getSurveyStore()

const TableSurvey = () => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const [delName, setDelName] = useState<string>("")
    const [delId, setDelId] = useState<string>("")

    function deleteConfirmation(survey: Survey) {
        setConfirm(true)
        setDelName(survey.question!!)
        setDelId(survey.idQuiz!!)

    }

    const deleteSurvey = async (surveyId: string) => {
        await surveyStore.deleteSurvey(localStorage.getItem('user_etno_locality')!, surveyId)
        setConfirm(false)
        window.location.reload()
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {surveyStore.getEditSurvey ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-left">
                                <EditSurvey />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            {surveyStore.getSurvey !== undefined ? (
                <div>
                    <div className="bg-white border-b border-2 rounded-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                        <div className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                            <label className="text-xl font-medium">Pregunta:</label>
                            <div className="border-2 w-full rounded-md text-center">
                                <label> {surveyStore.getSurvey.question!!}</label>
                            </div>
                        </div>
                        <div className="lg:w-2/3">
                            <div className="px-6 py-2  text-gray-900 whitespace-nowrap dark:text-white ">
                                <label className="font-medium">Respuesta 1</label>
                                <div className=" border-2 rounded-md">
                                    {surveyStore.getSurvey.answerOne}
                                </div>
                            </div>
                            <div className="px-6 py-2  text-gray-900 whitespace-nowrap dark:text-white ">
                                <label className="font-medium">Respuesta 2</label>
                                <div className=" border-2 rounded-md">
                                    {surveyStore.getSurvey.answerTwo}
                                </div>
                            </div>
                            <div className="px-6 py-2  text-gray-900 whitespace-nowrap dark:text-white ">
                                <label className="font-medium">Respuesta 3</label>
                                <div className=" border-2 rounded-md">
                                    {surveyStore.getSurvey.answerThree}
                                </div>
                            </div>
                            <div className="px-6 py-2  text-gray-900 whitespace-nowrap dark:text-white ">
                                <label className="font-medium">Respuesta 4</label>
                                <div className=" border-2 rounded-md">
                                    {surveyStore.getSurvey.answerFour}
                                </div>
                            </div>
                        </div>
                        <div className="h-20 flex items-center justify-center relative ">
                            <button className="btnStandard w-20 mr-5" onClick={() => surveyStore.setEditSurvey(true)}> Editar</button>
                            <button className="btnStandard" onClick={() => deleteConfirmation(surveyStore.getSurvey!!)}>Eliminar</button>
                        </div>
                        {confirm ? (
                            <div>
                                <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                                    <div className="fixed inset-0 w-screen h-screen">
                                        <div className=" flex justify-center mt-10 ">
                                            <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                                <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {delName}?</label>
                                                <div className="flex justify-center m-auto mt-5 mb-3">
                                                    <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteSurvey(delId)}>SI</button>
                                                    <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : <></>}
                    </div>
                    <div className="rounded-md ">
                        <div className="mt-5 font-medium text-gray-900 text-xl">
                            <label>Resultados:</label>
                        </div>
                        <div className="flex lg:flex-row flex-col mb-5">
                            <div className="lg:w-1/4 mr-1">
                                <div >
                                    <label>Pregunta 1</label>
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    {surveyStore.getSurvey.resultOne}
                                </div>
                            </div>
                            <div className="lg:w-1/4 mr-1">
                                <div >
                                    <label>Pregunta 2</label>
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    {surveyStore.getSurvey.resultTwo}
                                </div>
                            </div>
                            <div className="lg:w-1/4 mr-1">
                                <div >
                                    <label>Pregunta 3</label>
                                </div>
                                <div className=" font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    {surveyStore.getSurvey.resultThree}
                                </div>
                            </div>
                            <div className="lg:w-1/4 mr-1">
                                <div >
                                    <label>Pregunta 4</label>
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    {surveyStore.getSurvey.resultFour}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<div className="flex flex-row m-1">
                <img src={surveyRed} alt="BIG" />
                <label className="text-xl my-auto ml-5 font-medium">No hay Encuestas</label>
            </div>)}
        </div>
    )
}
export default observer(TableSurvey)