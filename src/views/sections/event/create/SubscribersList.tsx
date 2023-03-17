import { observer } from "mobx-react-lite"
import logoEtno from '../../../../../src/assets/logo_etno.png'
import { CSVLink } from 'react-csv';
import { useState } from "react"
import EventStore from "../../../../viewmodels/Event/EventStore"
import { SubscriptionUser } from "../../../../models/section/Section"

const eventStore = EventStore.getEventStore()
interface PropTable {
    headerList: string[],
    list?: Event[],
    currentPage?: number
}
const headers = [
    { label: 'Título', key: 'title' },
    { label: 'Plazas', key: 'seats' },
    { label: 'Nombre', key: 'name' },
    { label: 'Email', key: 'mail' },
    { label: 'Telefono', key: 'phone' },
    { label: 'Precio', key: 'wallet' },
    { label: 'Susripcion', key: 'isSubscribe' },
]

const SubscribersList = (prop: PropTable) => {
    const [subs, setSubs] = useState<SubscriptionUser[]>(eventStore.getEvent.userSubscriptions!!)


    const falseUsers = [{
        title: "Pepe",
        seats: "2",
        name: "btro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "btro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "otro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "btro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "btro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "atro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "aepe",
        seats: "2",
        name: "ztro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "atro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "mtro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "ntro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "ktro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    }, {
        title: "Pepe",
        seats: "2",
        name: "ytro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "oro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "ptro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },
    {
        title: "Pepe",
        seats: "2",
        name: "ptro pepe",
        mail: "mail",
        phone: "123456",
        wallet: "28€",
        isSubscribe: true
    },

    ]

     return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-11/12 h-screen overflow-y-auto border-2 rounded-md bg-white   ">
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={logoEtno} alt="logo_Etno"></img>
                    <p className='flex  text-white lg:text-3xl text-2xl p-3 uppercase'>usuarios suscritos </p>
                </div>
            </div>
            {subs.length === 0 ? (
                <div>
                    <div className="text-center text-2xl mt-5"><label>No hay usuarios suscritos</label></div>
                </div>
            ) : (
                <div className="h-5/6 overflow-y-auto">
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
                            {subs.map((subUsersMap, index) => (
                                subs.length > 0 &&
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        <div className="tableCamp h-10 ">
                                            {subUsersMap.title}
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="tableCamp overflow-y-auto  min-w-full h-10 ">
                                            {subUsersMap.seats}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="tableCamp h-10 ">
                                            {subUsersMap.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="tableCamp h-10 ">
                                            {subUsersMap.mail}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="tableCamp h-10 ">
                                            {subUsersMap.phone
                                            }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="tableCamp h-10 ">
                                            {subUsersMap.wallet}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="tableCamp h-10 ">
                                            {subUsersMap.isSubscribe ? "si" : "no"}
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center lg:flex-row flex-col">
                <div>
                    {subs && (
                        <button className="btnStandard mr-3">
                            <CSVLink
                                data={subs}
                                filename={'subscribedUsers.csv'}
                                enclosingCharacter={` `}
                                target="_blank"
                                headers={headers} >Exportar a excel
                            </CSVLink>
                        </button>)}
                    <button name="bandBtnCancel" className="btnStandard " onClick={() => eventStore.setModalSubs(false)}>Volver  </button>
                </div>
            </div>
        </div>
    )
}
export default observer(SubscribersList)