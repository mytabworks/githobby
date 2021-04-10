import {
    qs,
    qsa,
    triggerEvent,
    on,
    off
} from '@utils/dom'

const getSpeed = (className = "") => {
    let speed = 700
    if(className.includes('slower')) {
        speed = 1500
    } else if(className.includes('slow')) {
        speed = 1000
    } else if(className.includes('fast')) {
        speed = 300
    } else if(className.includes('faster')) {
        speed = 150
    }
    return speed
}

export function Collapsible(element: any) {
    const targetID = element.getAttribute('data-collapse')
    let cleanUp: any
    const ending = function (target: any, isClosed: boolean) {
        const duration = getSpeed(target.className)
        qsa(`[data-collapse="${targetID}"]`).forEach((toggler: any) => toggler.setAttribute("aria-expanded", `${!isClosed}`))
        clearTimeout(target.cleanUp)
        target.cleanUp = setTimeout(function () {
            triggerEvent(target, (isClosed ? 'hidden' : 'shown') + '.n.collapse')
            target.classList.remove("transition")
            target.style.display = target.style.height = null
        }, duration)
    }
    const show = function () {
        const target:any = qs(`[data-collapsible="${targetID}"]`)
        if (target.matches('.show')) return
        target.style.display = "block"
        triggerEvent(target, 'show.n.collapse')
        target.style.height = "0"
        target.classList.add("transition")
        setTimeout(function () {
            target.classList.add("show")
            target.style.height = target.scrollHeight + "px"
        }, 50)
        ending(target, false)
    }
    const close = function () {
        const target:any = qs(`[data-collapsible="${targetID}"]`)
        if (!target.matches('.show')) return
        target.style.display = "block"
        triggerEvent(target, 'hide.n.collapse')
        target.style.height = target.offsetHeight + "px"
        target.classList.add("transition")
        setTimeout(function () {
            target.classList.remove("show")
            target.style.height = "0"
        }, 50)
        ending(target, true)
    }
    const handlers = {
        toggler: function (e: MouseEvent) {
            const target:any = qs(`[data-collapsible="${targetID}"]`)
            e.preventDefault()
            const trigger: any = e.target
            const accordion = qs(`[data-collapse-container="${target.getAttribute('data-accordion')}"]`)
            if (accordion) {
                const prevShow: any = qs("[data-accordion].show", accordion)
                if (prevShow && prevShow !== target) {
                    const prevShowTrigger: any = qs(`[data-collapse="${prevShow.getAttribute('data-collapsible')}"]`);
                    const prevShowInstance = prevShowTrigger?.neu?.collapse
                    if(prevShowInstance) {
                        prevShowInstance.close()
                    }
                }
            }
            const isShow = target.matches('.show')
            if (isShow) {
                close()
            } else {
                show()
            }
            target.ontransitionend = function () {
                trigger?.blur()
                target.ontransitionend = null
            }
        }
    }
    const init = () => {
        on(element, 'click', handlers.toggler)
        element.neu = element.neu || {}
        element.neu.collapse = this
    }
    init()
    this.destroy = function () {
        delete element.neu.collapse

        off(element, 'click', handlers.toggler)
    }
    this.show = function () {
        show()
    }
    this.close = function () {
        close()
    }
}