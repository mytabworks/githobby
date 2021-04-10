const d = window?.document
export const root = d?.documentElement

export function qs(query: string, finder?: Element) {
    return (finder || d)?.querySelector(query)
}
export function qsa(query: string, finder?: Element) {
    return Array.from((finder || d)?.querySelectorAll(query))
}
export function on(element: Element, event: string, callback: (e: any) => void) {
    element?.addEventListener(event, callback, false)
}
export function off(element: Element, event: string, callback: (e: any) => void) {
    element?.removeEventListener(event, callback, false)
}
export function triggerEvent(el: Element, event: any, opt?: any) {
    var custom: any = new CustomEvent(event, opt || {})
    for(let key in opt) {
        custom[key as any] = opt[key]
    }
    return el?.dispatchEvent(custom)
}