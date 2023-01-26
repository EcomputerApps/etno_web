type Menu = {
    title: string,
    src: string,
    gap?: Boolean
}

interface PanelHandler{
    section: string,
    open: Boolean,
    menu: Menu[]
}

export type { PanelHandler, Menu }