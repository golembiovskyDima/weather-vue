import { defineStore } from "pinia";
import { ref } from "vue";
import { ToastItemType } from "../components/AppToasts";

export const useToastStore = defineStore('toast', () => {
    // state
    const tosatsList = ref<ToastItemType[]>([]);

    // actions
    const addToast = (item: ToastItemType) => {

        const toast = tosatsList.value.find((toast) => toast.title === item.title);
        if (!toast) {
            tosatsList.value = [item, ...tosatsList.value];
        }

    }
    const removeToast = (title: string) => {
        tosatsList.value = tosatsList.value.filter((toast) => toast.title !== title);
    }

    return {
        tosatsList,
        addToast,
        removeToast,
    }
})