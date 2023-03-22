import Pencil from "../../../assets/menu/create.svg"
import SurveyStore from "../../../viewmodels/survey/SurveyStore"
import CreateSurvey from "./create/CreateSurvey"
import { observer } from "mobx-react-lite"
import TableSurvey from "./TableSurvey"
import { ToastContainer } from "react-toastify"
import { useEffect } from "react"
import SurveyResults from "./SurveyResults"


const surveyStore = SurveyStore.getSurveyStore()
const Survey = () => {

    useEffect(() => {
        surveyStore.getRequestSurvey()
    }, [])

    return (
        <div className="w-full h-full  relative">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Encuestas</h2>
                    <div className="mainButtonsDiv">
                        <button type="button" className="btnStandard mr-3" onClick={() => surveyStore.setModalResult(true)}>
                            <label className="lg:text-base text-xs">Resultados</label>
                        </button>
                        <button type="button" className="btnStandard " onClick={() => surveyStore.setCreateSurvey(true)}>
                            <img src={Pencil} alt="Create" />
                            <label className="lg:text-base text-xs ">Crear</label>
                        </button>
                    </div>
                </div>
                <TableSurvey />
                {surveyStore.getCreateSurvey ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-left">
                                    <CreateSurvey />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
                {surveyStore.getModalRresult ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-left">
                                    <SurveyResults />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
            </div>
            <ToastContainer style={{ margin: "50px" }} />
        </div>
    )
}
export default observer(Survey)