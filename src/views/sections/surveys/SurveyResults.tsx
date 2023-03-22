import SurveyStore from "../../../viewmodels/survey/SurveyStore"
import logoEtno from '../../../assets/logo_etno.png'
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { CSVLink } from 'react-csv';
import { observer } from "mobx-react-lite";
import ResultDetails from "./ResultDetails";
import { QuizResult } from "../../../models/section/Section";
import { useEffect, useState } from "react";

const surveyStore = SurveyStore.getSurveyStore()
const headerPage = ["Pregunta", "Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4"]
const SurveyResults = () => {
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        surveyStore.getPaginatedResultsRequest(localStorage.getItem('user_etno_locality')!, pageNumber, 5)
    }, [pageNumber])

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }

    const decrementPage = () => {
        if (pageNumber > 0)
            setPageNumber(pageNumber - 1)
    }

    const headers = [
        { label: 'Pregunta', key: 'question' },
        { label: 'Respuesta 1', key: 'answerOne' },
        { label: 'Respuesta 2', key: 'answerTwo' },
        { label: 'Respuesta 3', key: 'answerThree' },
        { label: 'Respuesta 4', key: 'answerFour' },
        { label: 'Resultado 1', key: 'resultOne' },
        { label: 'Resultado 2', key: 'resultTwo' },
        { label: 'Resultado 3', key: 'resultThree' },
        { label: 'Resultado 4', key: 'resultFour' }
    ]

    const testObject = [{
        question: "Que tal?",
        answerOne: "Bien",
        answerTwo: "Regular",
        answerThree: "Mal",
        answerFour: "NC",
        resultOne: 12,
        resultTwo: 2,
        resultThree: 4,
        resultFour: 15
    },
    {
        question: "Que os parece en politica de auyitmaiemtno bla bla bla para hoy y mañana y futuro y asado?",
        answerOne: "Bien",
        answerTwo: "Regular",
        answerThree: "Mal",
        answerFour: "NC",
        resultOne: 12,
        resultTwo: 2,
        resultThree: 4,
        resultFour: 15

    },
    {
        question: "Que tal qwwefsda sadf asdf sdf sd ?",
        answerOne: "Bien fdf dsf sdf sdf sd fsd sd ",
        answerTwo: "Regular fsdf sdfsdfsdfsdf fds fsd fsd fdsfsdfsdfsdf",
        answerThree: "Mal fsdfsdf sdf sdfsdfsdfsdfsdfsd fsdfsdfsdfsdf sdf sdf sdfsdfsdfsdfsdfsd",
        answerFour: "NC fsfsdfsdf sdf sdfsdfsdfsdfsdfsdf sdfsdfsdfsdf sdf sdfsdfdfsdfwefwdswewefdsd dsadasd asd asd as dasd asqwqwedas",
        resultOne: 12,
        resultTwo: 2,
        resultThree: 4,
        resultFour: 15
    },
    ]

    function saveResults(result: QuizResult) {
        surveyStore.updateQuizResult(result)
        surveyStore.setModalDetails(true)
    }
    return (
        <div className="flex flex-col lg:m-auto lg:w-2/3 w-fit h-screen border-2 rounded-md bg-white">
            {surveyStore.getModalDetails ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className=" w-screen h-screen top-0 -left-1 fixed">
                            <div className="w-screen  flex justify-start">
                                <ResultDetails />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>resultados</p>
                </div>
            </div>
            <div >
                <table className=" w-full text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <tr>
                            {headerPage.map((item, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    <label className="whitespace-nowrap">{item}</label>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {surveyStore.getPaginatedQuizResults.content?.map((quizResultMap, index) => (
                            surveyStore.getPaginatedQuizResults.content!!.length > 0 &&
                            <tr key={index} className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-center max-w-min overflow-hidden">
                                <th scope="row" className="h-20 text-gray-900  dark:text-white cursor-pointer" onClick={() => saveResults(quizResultMap)}>
                                    <div className="overflow-y-auto max-h-20">
                                        {quizResultMap.question}
                                    </div>
                                </th>
                                <td className="tableCamp w-1/5 overflow-auto" onClick={() => saveResults(quizResultMap)}>
                                    <div className="overflow-y-auto max-h-20">
                                        {quizResultMap.answerOne}
                                    </div>
                                </td>
                                <td className="tableCamp" onClick={() => saveResults(quizResultMap)}>
                                    <div className="overflow-y-auto max-h-20">
                                        {quizResultMap.answerTwo}
                                    </div>
                                </td>
                                <td className="tableCamp" onClick={() => saveResults(quizResultMap)}>
                                    <div className="overflow-y-auto max-h-20">
                                        {quizResultMap.answerThree}
                                    </div>
                                </td>
                                <td className="tableCamp" onClick={() => saveResults(quizResultMap)}>
                                    <div className="overflow-y-auto max-h-20">
                                        {quizResultMap.answerFour}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
                <button className="btnStandard mr-3" onClick={decrementPage} disabled={pageNumber < 1}>
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                {surveyStore.getPaginatedQuizResults.content! && (
                    <CSVLink
                        data={surveyStore.getPaginatedQuizResults.content!}
                        filename={'QuizResults.csv'}
                        enclosingCharacter={` `}
                        target="_blank"
                        className={"btnStandard mr-3 h-12"}
                        headers={headers} >Exportar a excel
                    </CSVLink>
                )}
                <button className="btnStandard mr-3" onClick={() => surveyStore.setModalResult(false)}>Volver</button>
                <button onClick={incrementPage} disabled={pageNumber === surveyStore.getPaginatedQuizResults.totalPages!! - 1 || surveyStore.getPaginatedQuizResults.content?.length === 0}
                    className="btnStandard">
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>
        </div>
    )
}
export default observer(SurveyResults)
