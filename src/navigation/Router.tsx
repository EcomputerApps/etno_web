import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import ViewRender from "../components/ViewRender"
import HomePage from "../pages/HomePage"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <ViewRender element={<HomePage/>}/> }/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router