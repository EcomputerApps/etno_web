import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import ViewRender from "../components/ViewRender"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import CreateEventPage from "../pages/sections/CreateEventPage"
import CreateTourismPage from "../pages/sections/CreateTourismPage"
import CreateBandPage from "../pages/sections/CreateBandPage"
import CreateSponsorPage from "../pages/sections/CreateSponsorPage"
import CreateServicePage from "../pages/sections/CreateServicePage"
import CreatePharamcyPage from "../pages/sections/CreatePharmacyPage"
import CreateNecrologuePage from "../pages/sections/CreateNecrologuePage"
import CreateNewsPage from "../pages/sections/CreateNewsPage"
import CreateAdvertPage from "../pages/sections/CreateAdvertPage"
import LogoutPage from "../pages/LogoutPage"
import CreateLinkPage from "../pages/sections/CreateEnlacePage"
import CreatePOD from "../pages/sections/CreatePOD"
import EditNews from "../views/sections/news/create/EditNews"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={ <ViewRender element={<HomePage/>}/> }/>
                <Route path="/login" element={ <ViewRender element={<LoginPage/>}/> }/>
                <Route path="/logout" element={<ViewRender element={<LogoutPage/>}/>}/>
                <Route path="/addEvent" element={<ViewRender element={<CreateEventPage/>}/>}/>
                <Route path="/AddTourism" element={<ViewRender element={<CreateTourismPage/>}/>}/>
                <Route path="/AddBand" element={<ViewRender element={<CreateBandPage/>}/>}/>
                <Route path="/AddSponsor" element={<ViewRender element={<CreateSponsorPage/>}/>}/>
                <Route path="/addService" element={<ViewRender element={<CreateServicePage/>}/>}/>
                <Route path="/addPharmacy" element={<ViewRender element={<CreatePharamcyPage/>}/>}/>
                <Route path="/addNecrologue" element={<ViewRender element={<CreateNecrologuePage/>}/>}/>
                <Route path="/addNews" element={<ViewRender element={<CreateNewsPage/>}/>}/>
                <Route path="/addAdvert" element={<ViewRender element={<CreateAdvertPage/>}/>}/>
                <Route path="/addLink" element={<ViewRender element={<CreateLinkPage/>}/>}/>
                <Route path="/findGuardia" element={<ViewRender element={<CreatePOD/>}/>}/>
                <Route path="/editNews" element={<ViewRender element={<EditNews/>}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router