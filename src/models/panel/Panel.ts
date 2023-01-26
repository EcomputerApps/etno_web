type Menu = {
    title: string,
    src: string,
    gap?: Boolean
}

interface PanelHandler{
    open: Boolean,
    menu: Menu[]
}

export type { PanelHandler }