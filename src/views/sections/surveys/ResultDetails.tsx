import { observer } from "mobx-react-lite"
import SurveyStore from "../../../viewmodels/survey/SurveyStore"
import logoEtno from '../../../../src/assets/logo_etno.png'
import { useState } from "react"

const surveyStore = SurveyStore.getSurveyStore()
const ResultDetails = () => {
    const [result] = useState(surveyStore.getQuizResult)
    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-11/12 h-fit overflow-y-auto border-2 rounded-md bg-white">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white text-3xl p-3 uppercase'>Detalles</p>
                </div>
            </div>
            <div>
                <div className="m-1 text-2xl font-semibold text-center mt-5 border-2 rounded-md overflow-auto">
                    <label>{result.question}</label>
                </div>
                <div className="m-3">
                    <div className="border-2 rounded-md my-1">
                        <div className="mr-10 m-1">
                            <label>Respuesta 1:</label>
                            <label className="font-medium ml-1 overflow-auto">{result.answerOne}</label>
                        </div>
                        <div className="m-1">
                            <label>Votado:</label>
                            <label className="font-medium ml-1">{result.resultOne}</label>
                        </div>
                    </div>
                    <div className="border-2 rounded-md my-1">
                        <div className="mr-10 m-1">
                            <label>Respuesta 2:</label>
                            <label className="font-medium ml-1 overflow-auto">{result.answerTwo}</label>
                        </div>
                        <div className="m-1">
                            <label>Votado:</label>
                            <label className="font-medium ml-1">{result.resultTwo}</label>
                        </div>
                    </div>
                    <div className="border-2 rounded-md my-1">
                        <div className="mr-10 m-1">
                            <label>Respuesta 3:</label>
                            <label className="font-medium ml-1 overflow-auto">{result.answerThree}</label>
                        </div>
                        <div className="m-1">
                            <label>Votado:</label>
                            <label className="font-medium ml-1">{result.resultThree}</label>
                        </div>
                    </div>
                    <div className="border-2 rounded-md my-1">
                        <div className="mr-10 m-1">
                            <label>Respuesta 4:</label>
                            <label className="font-medium ml-1 overflow-auto">{result.answerFour}</label>
                        </div>
                        <div className="m-1">
                            <label>Votado:</label>
                            <label className="font-medium ml-1">{result.resultFour}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center m-5">
            <button className="btnStandard" onClick={() => surveyStore.setModalDetails(false)}>VOLVER</button>
            </div>
          </div>
    )
}
export default observer(ResultDetails)