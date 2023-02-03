import { useDropzone } from "react-dropzone"
import { useNavigate } from "react-router-dom"


const CreateIncident = () => {

    const navigate = useNavigate()

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            accept: { "image/png": [".png"], "image/jpeg": [".jpeg", ".jpg"], "image/gif": [".gif"] },
            maxFiles: 1, maxSize: 10485760, noClick: true
        })

    return (
        <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2" >
            <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                <div className="w-full flex flex-row p-2 justify-between">
                    <img src={"https://etno.ecomputer.es/images/app.png"} alt="logo_etno"></img>
                    <p className='flex  text-white text-3xl p-3'>INCIDENCIAS</p>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Id Dispositivo</label>
                    <input placeholder="Id Dispositivo" name="IdDevice" type="text" className="border-2 rounded-md p-2"></input>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Título</label>
                    <input placeholder="Titulo" name="incidentTitle" type="text" className="border-2 rounded-md p-2"></input>
                </div>
            </div>
            <div className="w-full flex flex-1 flex-col pl-3">
                <div className="flex flex-col p-1">
                    <label className="text-left text-2xl p-1">Descripción</label>
                    <textarea placeholder="Descripcion" name="incidentDescription" rows={3} className="border-2 rounded-md p-2"></textarea>
                </div>
            </div>
            <div className="flex m-auto justify-center p-3">
            <button name="bandBtnCancel" className="inline-flex items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500">Publicar</button>
                <button name="bandBtnCancel" className="inline-flex items-center rounded-md border  border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => navigate("/home")}>Cancelar</button>
            </div>
        </div>
    )
}

export default CreateIncident