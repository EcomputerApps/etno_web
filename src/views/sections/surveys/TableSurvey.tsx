import { observer } from "mobx-react-lite"
import { Survey } from "../../../models/section/Section"
import SurveyStore from "../../../viewmodels/survey/SurveyStore"
import EditSurvey from "./create/EditSurvey"

const surveyStore = SurveyStore.getSurveyStore()

const array = new Array<Survey>(surveyStore.getSurvey)
function saveSurvey(survey: Survey) {
    surveyStore.updateSurvey(survey)
    surveyStore.setEditSurvey(true)
}
const results = new Array(
    { reply: "12" },
    { reply: "13" },
    { reply: "5" },
    { reply: "1" }
)

const TableSurvey = () => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {surveyStore.getEditSurvey ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center">
                                <EditSurvey />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            {surveyStore.getSurvey.replies?.length!! > 1 ? (
                <div>
                    <div className="bg-white border-b border-2 rounded-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                        <div className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                            Pregunta:
                            <div className="tableCamp border-2 rounded-md">
                                {surveyStore.getSurvey.question}
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <div className="tableCampl overflow-y-auto  text-justify flex flex-col w-full ">
                                {surveyStore.getSurvey.replies?.map((item, index) => (
                                    <div key={index} className="tableCamp flex flex-col ">
                                        {item !== "" ? (
                                            <div className=" w-full">
                                                <div className="font-medium text-gray-900 w-full ">
                                                    <label>Respuesta {index + 1}</label>
                                                </div>
                                                <div className="font-medium text-gray-900  w-full text-center p-2 border-2 rounded-md">
                                                    <label >{item}</label>
                                                </div>
                                            </div>
                                        ) : <></>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className=" px-6 py-4 w-1/2">
                                <div className="font-medium text-gray-900 w-1/2">
                                    Fecha de Cierre
                                </div>
                                <div className="font-medium text-gray-900  text-center border-2 rounded-md w-1/2">
                                    {surveyStore.getSurvey.closeDate} {surveyStore.getSurvey.closeTime}
                                </div>
                            </div>
                            <div className="px-6 py-4 w-1/2">
                                <div className="h-20 flex items-center justify-end relative ">
                                    <button className="btnStandard w-20 mr-5" onClick={() => saveSurvey(array[0])}> Editar</button>
                                    <button className="btnStandard" >Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md ">
                        <div className="mt-5 font-medium text-gray-900 text-xl">
                            Resultados
                        </div>
                        <div className="flex flex-row mb-5">
                            <div className="w-1/4 mr-1">
                                <div >
                                    <label>Pregunta 1</label>
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    {results[0].reply}
                                </div>
                            </div>
                            <div className="w-1/4 mr-1">
                                <div >
                                    <label>Pregunta 2</label>
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    {results[1].reply}
                                </div>
                            </div>
                            <div className="w-1/4 mr-1">
                                <div >
                                    <label>Pregunta 3</label>
                                </div>
                                <div className=" font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    {results[2].reply}
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div >
                                    <label>Pregunta 4</label>
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    {results[3].reply}
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