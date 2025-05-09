
let logoutCallback: (() => void) | null = null

export function setLogoutHandler(fn: () => void) {
    logoutCallback = fn
}

export function triggerLogout() {
    if (logoutCallback) {
        logoutCallback()
    }
}
