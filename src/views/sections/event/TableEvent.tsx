import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Event } from '../../../models/section/Section'
import EventStore from "../../../viewmodels/Event/EventStore"
import EditEvent from './create/EditEvent'
import SubscribersList from './create/SubscribersList'
const eventStore = EventStore.getEventStore()

interface PropTable {
    headerList: string[],
    list?: Event[],
    currentPage?: number
}

const TableEvent = (prop: PropTable) => {
   
    const [delTitle, setDelTitle] = useState<string>("")
    const[confirm, setConfirm] = useState<boolean>(false)
    function deleteConfirmation(title: string) {
        setConfirm(true)
        setDelTitle(title)
    }
    const deleteEvent = async (event: string) => {
        await eventStore.deleteEvent('Bolea', event)
        setConfirm(false)
    }
    function showParticipants(event: Event) {
        eventStore.setModalSubs(true)
        eventStore.updateEvent(event)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {eventStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-start">
                                <EditEvent />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            {eventStore.getModalSubs ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-start">
                                <SubscribersList headerList={['Título', 'Plazas', 'Nombre', 'Email', 'Teléfono', 'Precio', 'Suscripcion']} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <tr>
                            {prop.headerList.map((item, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    <div className="min-w-max">
                                        {item}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {eventStore.getPaginatedEvents.content?.map((eventMap, index) => (
                            eventStore.getPaginatedEvents.content!!.length > 0 &&
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <th scope="row" className="tableCamp font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    {eventMap.title}
                                </th>
                                <td className="tableCamp">
                                    {eventMap.description}
                                </td>
                                <td className="tableCamp ">
                                    {eventMap.hasSubscription ? "Evento de pago" : "Evento gratuito"}
                                </td>
                                <td className="tableCamp ">
                                    {eventMap.reservePrice + " €"}
                                </td>
                                <td className="tableCamp">
                                    {eventMap.seats}
                                </td>
                                <td className="tableCamp ">
                                    {eventMap.capacity}
                                </td>
                                <td className="tableCamp ">
                                    {eventMap.username}
                                </td>
                                <td className="tableCamp">
                                    {eventMap.address}
                                </td>
                                <td className="tableCamp">
                                    {eventMap.organization}
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className='h-20 flex items-center justify-center'>
                                        {eventMap.hasSubscription ? (
                                            <a href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline mr-2" onClick={() => {
                                                showParticipants(eventMap)
                                            }}>Participantes</a>
                                        ) : <></>}
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2" onClick={() => {
                                            eventStore.updateEvent(eventMap)
                                            eventStore.setModalEdit(true)
                                        }}>Editar</a>
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deleteConfirmation(eventMap.title!!)}>Eliminar</a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {delTitle}?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteEvent(delTitle)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
        </div>
    )
}
export default observer(TableEvent)


