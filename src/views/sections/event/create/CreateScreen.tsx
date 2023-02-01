import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { useDropzone } from "react-dropzone";

const CreateScreen = () => {

  const navigate = useNavigate()

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const {
    getRootProps, getInputProps, isDragActive

  } = useDropzone({
    onDrop, accept: { "image/png": [".png"], "image/jpeg": [".jpeg", ".jpg"], "image/gif": [".gif"] },
    maxFiles: 7, maxSize: 10485760, noClick: true
  })
  return (
    <div>
      <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2" >
        <div className="h-20 w-full flex bg-blue-900 rounded-t-md ">
          <div className="w-full flex flex-row gap-8 p-2 justify-between">
            <img src="https://etno.ecomputer.es/images/app.png"></img>
            <p className='flex  text-white text-3xl p-3'>EVENTO</p>
          </div>

        </div>
        <div className="w-full flex flex-1 flex-col  pl-3">
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Titulo</label>
            <input placeholder="Titulo" type="text" name="eventTitle" className="border-2 rounded-md p-2"></input>
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Direccion</label>
            <input placeholder="Direccion" type="text" name="eventDireccion" className="border-2 rounded-md p-2"></input>
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Descripcion</label>
            <textarea placeholder="Description" name="eventDescription" rows={3} className="border-2 rounded-sm p-2"></textarea>
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Organizacion</label>
            <input placeholder="Organizacion" type="text" name="eventOrganization" className="border-2 rounded-sm p-2"></input>
          </div>

          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1">Precio de reserva</label>
            <div className="relative flex flex-row mt-1 rounded-md">
              <div className=" pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">€</span>
              </div>
              <CurrencyInput name="eventPrice" className="pl-7 p-2 md:w-1/4 w-1/2 border-2 rounded-sm"
                placeholder="0,00" decimalsLimit={2} onValueChange={(value, name) => console.log(value, name)}
                onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace('-', "")} />

            </div>
          </div>

          <div className="flex flex-col p-1">
            <label className="text-left text-2xl p-1">Aforo</label>
            <input type="text" name="eventSeats" placeholder="0" onInput={(e) => (
              e.currentTarget.value = e.currentTarget.value.replace(/^[^1-9]/, ""),
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")
            )} className="p-2 md:w-1/4 w-1/2   border-2 rounded-sm" />
          </div>
          <div className="flex flex-col  p-1">
            <label className="text-left text-2xl p-1"
            >Enlace</label>
            <input placeholder="www.ecomputer.es" type="text" name="eventUrl" className="border-2 rounded-sm p-2"></input>
          </div>

          <div className="text-left p-1 ">
            <label className=" text-2xl">Fotos</label>
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

          <div className="flex flex-1 m-auto justify-center p-3 shadow-md">
            <img src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5"></img>
          </div>

          <div className="flex flex-col p-1">
            <label className="text-left text-2xl p-1">Fecha de Inicio</label>
            <input type="date" name="eventStart" className="w-40 border-2 rounded-sm" />
          </div>
          <div className="flex flex-col p-1">
            <label className="text-left text-2xl p-1">Fecha de Final</label>
            <input type="date" name="eventFinish" className="w-40 border-2 rounded-sm" />
          </div>
        </div>
        <div >
          <button name="eventBtnSave" className="bg-indigo-600 p-3 m-5 rounded-md focus:ring-2 ring-blue-800 hover:bg-indigo-700 text-white">Publicar</button>
          <button name="eventBtnCancel" className="bg-indigo-600 p-3 rounded-md focus:ring-2 ring-blue-800 hover:bg-indigo-700 text-white" onClick={() => navigate("/home")}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default CreateScreen