import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import ViewRender from "../components/ViewRender"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={ <ViewRender element={<HomePage/>}/> }/>
                <Route path="/login" element={<ViewRender element={<LoginPage/>}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router