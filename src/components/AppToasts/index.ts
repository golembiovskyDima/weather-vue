import AppToasts from "./AppToasts.vue";

export type ToastItemType = {
    title: string,
    message: string,
    depay?: number,
    type?: 'success' | 'error' | 'warning' | 'info'
}

export default AppToasts