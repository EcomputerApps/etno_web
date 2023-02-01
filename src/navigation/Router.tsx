import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import ViewRender from "../components/ViewRender"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import CreateEventPage from "../pages/sections/CreateEventPage"
import CreateTourismPage from "../pages/sections/CreateTourismPage"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={ <ViewRender element={<HomePage/>}/> }/>
                <Route path="/login" element={ <ViewRender element={<LoginPage/>}/> }/>
                <Route path="/addEvent" element={<ViewRender element={<CreateEventPage/>}/>}/>
                <Route path="/tourism" element={<ViewRender element={<CreateTourismPage/>}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router