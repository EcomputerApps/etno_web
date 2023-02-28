import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import EventStore from "../../../viewmodels/Event/EventStore"
const eventStore = EventStore.getEventStore()

interface PropTable {
    headerList: string[],
    list?: Event[],
    currentPage?: number
}

const TableEvent = (prop: PropTable) => {
    const navigate = useNavigate()
    const deleteEvent = async (event: string) => {
        await eventStore.deleteEvent('Bolea', event)
    }
    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                {eventStore.getPaginatedEvents.content?.map((event, index) => (
                       eventStore.getPaginatedEvents.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        <div className="tableCamp">
                            {event.title}
                            </div>
                        </th>
                        <td className="px-6 py-4">
                        <div className="tableCamp overflow-y-auto  min-w-full">
                            {event.description}
                            </div>
                        </td>
                        <td className="px-6 py-4 ">
                        <div className="tableCamp">
                            {event.reservePrice}€
                            </div>
                        </td>
                        <td className="px-6 py-4 ">
                        <div className="tableCamp">
                            {event.seats}
                            </div>
                        </td>
                        <td className="px-6 py-4 ">
                        <div className="tableCamp">
                            {event.capacity}
                            </div>
                        </td>
                        <td className="px-6 py-4 ">
                        <div className="tableCamp">
                            {event.username}
                            </div>
                        </td>
                        <td className="px-6 py-4 ">
                        <div className="tableCamp">
                            {event.address}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                        <div className="tableCamp">
                            {event.organization}
                            </div>
                        </td>
                        <td className="px-6 py-4 ">
                            <div className='h-20 flex items-center justify-center'>
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                                eventStore.updateEvent(event)
                                navigate('/editEvent')
                            }}>Editar</a>
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteEvent(event.title!!)}>Eliminar</a>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer/>
        </div>
    )
}
export default observer(TableEvent)


