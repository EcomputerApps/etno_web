import { useDropzone } from "react-dropzone"
import { useNavigate } from "react-router-dom"

const CreateTourism = () => {
    const navigate = useNavigate()

    const{acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone(
        {accept: {"image/png" : [".png"],"image/jpeg":[".jpeg", ".jpg"], "image/gif": [".gif"] },
         maxFiles:1, maxSize:10485760, noClick:true })

    return(
        <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2" >
        <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
            <div className="w-full flex flex-row p-2 justify-between">
            <img src="https://etno.ecomputer.es/images/app.png"></img>
            <p className='flex  text-white text-3xl p-3'>TURISMO</p>
            </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Tipo</label>
                    <input placeholder="Tipo" name="tourismType" type="text"  className="border-2 rounded-md p-2"></input>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Titulo</label>
                    <input placeholder="Titulo" name="tourismTitle"  type="text"  className="border-2 rounded-md p-2"></input>
                </div>
            </div >
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Descripcion</label>
                    <textarea placeholder="Descripcion" name="tourismDescription"  rows={3}  className="border-2 rounded-md p-2"></textarea>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Foto</label>
                    <div {...getRootProps()} className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md bg-white font-medium
                             text-indigo-600 focus-within:outline-none focus-within:ring-2
                              focus-within:ring-indigo-600 focus-within:ring-offset-2
                               hover:text-indigo-500">

                              <input   {...getInputProps()} />
                              {
                                isDragActive ?
                                <p>Suelta los archivos aquí ...</p> :
                                <p>Arrastre y suelte algunos archivos, o haga clic aquí para seleccionar archivos</p>
                              }
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                      </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Longitud</label>
                    <input placeholder="Longitud" type="text" name="tourismLong" className="border-2 rounded-md p-2"></input>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Latitude</label>
                    <input placeholder="Latitud" type="text" name="tourismLat" className="border-2 rounded-md p-2"></input>
                </div>
            </div>
            <div className="flex m-auto justify-center p-3">
                    <button name="pharmacyBtnSave" className="inline-flex items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">Publicar</button>
                    <button name="pharmacyBtnCancel" className="inline-flex items-center rounded-md border  border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={()=>navigate("/home")}>Cancelar</button>
            </div>
        </div>
    )
}
export default CreateTourism