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
                    <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                        <div className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                            Pregunta:
                            <div className="tableCamp border-2 rounded-md">
                                {surveyStore.getSurvey.question}
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <div className="tableCampl overflow-y-auto  text-justify flex flex-col w-full ">
                                {surveyStore.getSurvey.replies?.map((item, index) => (
                                    <div key={index} className="tableCamp flex flex-col  ">
                                        <div className="font-medium text-gray-900 w-full ">
                                            Respuesta {index + 1}
                                        </div>
                                        <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                            <label >{item}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className=" px-6 py-4 w-1/3">
                            <div className="font-medium text-gray-900">
                                Fecha de Cierre
                            </div>
                            <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                {surveyStore.getSurvey.closeDate} {surveyStore.getSurvey.closeTime}
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <div className="h-20 flex items-center justify-center relative">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => saveSurvey(array[0])} >Editar</a>
                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" >Eliminar</a>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md ">
                        <div className="mt-4 font-medium text-gray-900">
                            Resultados
                        </div>
                        <div className="flex flex-row mb-5">
                            <div className="w-1/4 mr-1">
                                <div >
                                    1
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    10
                                </div>
                            </div>
                            <div className="w-1/4 mr-1">
                                <div >
                                    2
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    7
                                </div>
                            </div>
                            <div className="w-1/4 mr-1">
                                <div >
                                    3
                                </div>
                                <div className=" font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    5
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div >
                                    4
                                </div>
                                <div className="font-medium text-gray-900  w-full text-center border-2 rounded-md">
                                    0
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