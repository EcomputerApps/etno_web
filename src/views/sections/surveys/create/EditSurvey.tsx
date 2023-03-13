import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import logoEtno from '../../../../assets/logo_etno.png'
import SurveyStore from "../../../../viewmodels/survey/SurveyStore"

const surveyStore = SurveyStore.getSurveyStore()
const EditSurvey = () => {
    const [survey, setSurvey] = useState(surveyStore.getSurvey)
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
                            name="bandType" type="text" value={survey.question} required={true}
                            className="inputCamp peer" />
                        <label className="labelFloatInput">Pregunta</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col pl-3 pb-7 pt-7">
                    <div className="flex pt-2  p-1  relative  ">
                        <input type="date" className="inputCamp peer w-40 px-2 mt-0.5 h-11 disabled:bg-gray-200 disabled:border-gray-300"
                        />
                        <input type="time" className="inputCamp peer w-40 px-2 mt-0.5 h-11 disabled:bg-gray-200 disabled:border-gray-300"
                        />
                        <label className={"labelFloatDate"}>Fecha de Cierre</label>
                    </div>
                </div>
                <div className='border-t-2 border-b-2 rounded-md pb-5'>
                    <div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text" value={survey.replies!![0]} required={true}
                                className="inputCamp peer" />
                            <label className="labelFloatInput">Respuesta 1</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text" value={survey.replies!![1]} required={true}
                                className="inputCamp peer" />
                            <label className="labelFloatInput">Respuesta 2</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text" value={survey.replies!![2]} required={true}
                                className="inputCamp peer" />
                            <label className="labelFloatInput">Respuesta 3</label>
                        </div>
                    </div><div className="w-full flex flex-1 flex-col pl-3">
                        <div className=" flex flex-col p-1 mt-5  relative">
                            <input placeholder=" "
                                name="bandType" type="text" value={survey.replies!![3]} required={true}
                                className="inputCamp peer" />
                            <label className="labelFloatInput">Respuesta 4</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                <button name="bandBtnSave" className="btnStandard mr-10" >Publicar</button>
                <button name="bandBtnCancel" className="btnStandard" onClick={() => surveyStore.setEditSurvey(false)}>Cancelar</button>
            </div>
        </div>
    )
}
export default observer(EditSurvey)