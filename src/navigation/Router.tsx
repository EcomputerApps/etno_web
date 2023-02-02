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
const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={ <ViewRender element={<HomePage/>}/> }/>
                <Route path="/login" element={ <ViewRender element={<LoginPage/>}/> }/>
                <Route path="/addEvent" element={<ViewRender element={<CreateEventPage/>}/>}/>
                <Route path="/tourism" element={<ViewRender element={<CreateTourismPage/>}/>}/>
                <Route path="/band" element={<ViewRender element={<CreateBandPage/>}/>}/>
                <Route path="/sponsor" element={<ViewRender element={<CreateSponsorPage/>}/>}/>
                <Route path="/service" element={<ViewRender element={<CreateServicePage/>}/>}/>
                <Route path="/pharmacy" element={<ViewRender element={<CreatePharamcyPage/>}/>}/>
                <Route path="/necrologue" element={<ViewRender element={<CreateNecrologuePage/>}/>}/>
                <Route path="/news" element={<ViewRender element={<CreateNewsPage/>}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router