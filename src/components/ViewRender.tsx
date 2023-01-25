import { Render } from "../models/render/Render"

const ViewRender = (prop: Render) => {
    return(
        <>
            {prop.element}
        </>
    )   
}

export default ViewRender