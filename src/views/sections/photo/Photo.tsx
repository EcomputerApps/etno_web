import { observer } from "mobx-react-lite"
import { useState } from "react"
import ImageSize from "../../../viewmodels/ImageSize"
const imageSize = ImageSize.getImageSize()

const Photo = () => {

    const images: string[] = ['https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
        'https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.webp',
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',

    ]
    const fotoArraLength: number = images.length

    const [start, setSart] = useState(0)
    const [finish, setFinish] = useState(6)
    const [showModal, setModal] = useState(false)

    function incrementPage(num: number) {
        let localNumber = num % 6
        if (localNumber >= 0) {
            setSart(start + 6)
            setFinish(finish + 6)
            localNumber--

        }
    }
    function decrementPage() {
        if (start >= 6) {
            setSart(start - 6)
            setFinish(finish - 6)

        }
    }

    return (
        <div className="flex relative flex-col h-full gap-2 w-full ">
            <div className="flex">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Fotos</h2>
            </div>
            <div>
                {showModal ? (
                    <div>
                        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                            <div className="w-1/2 flex flex-col ">
                                <button className="  text-blue-600  font-medium place-self-end bg-white rounded-full w-7 h-7 border-dark-purple border-2 mb-1 " onClick={() => setModal(false)}>X</button>
                                <img src={imageSize.getLink} className="rounded-md"></img>
                            </div>
                        </div>
                    </div>
                ) : <></>}
            </div>
            <div className="relative  w-full overflow-x-auto shadow-md sm:rounded-lg">
                <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <div className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <div className="flex md:w-1/3 w-full m-auto  p-1">
                            <input
                                type="text"
                                name="photosSearch"
                                className=" mr-3 block md:w-3/4 px-4 py-2 text-purple-700 w-full bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <button onClick={() => {
                            }}

                                name="photosSearchBtn" className="px-5 text-white bg-indigo-800 rounded-md shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col" > 
               <div className="flex md:flex-row flex-col w-full">
                    <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                        <div className="flex flex-wrap -m-1 md:-m-2">
                            {images.slice(start, finish).map((image, index) => (
                                <div key={index} className="flex flex-wrap w-1/3">
                                    <div className="w-full p-1 md:p-2 ">
                                        <img alt="gallery" onClick={(e) => {
                                            setModal(true)
                                            imageSize.setLink(e.currentTarget.src)
                                        }} className="block object-cover object-center w-full h-full hover:scale-125  rounded-md"
                                            src={image} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
                <button disabled={start < 6} className="inline-flex disabled:bg-gray-500 w-fit items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => { decrementPage() }}>
                    <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Anterior
                </button>
                <button disabled={(fotoArraLength - start) <= 6} className="inline-flex items-center rounded-md border  disabled:bg-gray-500 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => { incrementPage(fotoArraLength) }} >
                    Siguiente
                    <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>

        </div>
    )

}
export default observer(Photo)