import Pencil from "../../../assets/menu/create.svg"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"

import SurveyStore from "../../../viewmodels/survey/SurveyStore"
import CreateSurvey from "./create/CreateSurvey"
import { observer } from "mobx-react-lite"
import TableSurvey from "./TableSurvey"
import { ToastContainer } from "react-toastify"
import { useState } from "react"

const surveyStore = SurveyStore.getSurveyStore()
const Survey = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }
    return (
        <div className="w-full h-full  relative">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Encuestas</h2>
                    <div className="ml-auto">
                        <button type="button" className="btnStandard" onClick={() => surveyStore.setCreateSurvey(true)}>
                            <img src={Pencil} alt="Create" />
                            Crear
                        </button>
                    </div>
                </div>
                <TableSurvey />
                {surveyStore.getCreateSurvey ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                            <div className="fixed inset-0 w-screen h-screen">
                                <div className="w-screen  flex justify-center">
                                    <CreateSurvey />
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