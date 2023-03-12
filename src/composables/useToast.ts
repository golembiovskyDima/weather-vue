import { ToastItemType } from "../components/AppToasts"
import { useToastStore } from "../store/toastStore"

export default () => {
	const toastStore = useToastStore();

	const addToast = (toast: ToastItemType) => {
		toastStore.addToast(toast)
	}
	const success = (toast: Omit<ToastItemType, 'type'>) => {
		addToast({ ...toast, type: 'success' })
	}

	const error = (toast: Omit<ToastItemType, 'type'>) => {
		addToast({ ...toast, type: 'error' })
	}

	const warning = (toast: Omit<ToastItemType, 'type'>) => {
		addToast({ ...toast, type: 'warning' })
	}

	const info = (toast: Omit<ToastItemType, 'type'>) => {
		addToast({ ...toast, type: 'info' })
	}

	return {
		success,
		error,
		warning,
		info
	}
}