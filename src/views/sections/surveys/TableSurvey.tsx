import { observer } from "mobx-react-lite"
import { Survey } from "../../../models/section/Section"
import SurveyStore from "../../../viewmodels/survey/SurveyStore"
import EditSurvey from "./create/EditSurvey"

const surveyStore = SurveyStore.getSurveyStore()
const deleteSurvey = async (surveyId: string) => {
    await surveyStore.deleteSurvey('Bolea', surveyId)
}
const TableSurvey = () => {
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
            {/*temp*/}
            {surveyStore.getSurvey !== undefined ? (
                <div>
                    {/*map to find isActive in survey array*/}
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
                            <button className="btnStandard" onClick={()=>deleteSurvey(surveyStore.getSurvey.idQuiz!!)}>Eliminar</button>
                        </div>
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
            ) : <div className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                <label>No hay encuestas activas</label>
            </div>}
        </div>
    )
}
export default observer(TableSurvey)