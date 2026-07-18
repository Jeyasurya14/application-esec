
export function calculatePanelTop(trigger:HTMLElement, sidebar:HTMLElement, panelHeight=388, spacing=8):number{
    const sidebarHeight = sidebar.clientHeight;
    const sidebarPaddingTop = Number.parseFloat(getComputedStyle(sidebar).paddingTop) || 0;

    const bottonTop = trigger.offsetTop - sidebarPaddingTop;
    const maxTop = Math.max(0, sidebarHeight - panelHeight - spacing)

    return Math.max(0, Math.min(bottonTop, maxTop))
}