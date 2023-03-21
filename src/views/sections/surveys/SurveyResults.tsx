import SurveyStore from "../../../viewmodels/survey/SurveyStore"
import logoEtno from '../../../assets/logo_etno.png'
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"

const surveyStore = SurveyStore.getSurveyStore()
const SurveyResults = () => {
    return (
        <div className="flex flex-col md:m-auto lg:w-1/2 w-11/12 md:h-screen border-2 rounded-md bg-white">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>resultados</p>
                </div>
            </div>
        
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
                <button className="btnStandard mr-3">
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                <button className="btnStandard mr-3" onClick={() => surveyStore.setModalResult(false)}>Volver</button>
                <button
                    className="btnStandard">
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>
        </div>
    )
}

export default SurveyResults
