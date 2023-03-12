
const getItem = (key: string) => {
    try {
        const item = window.localStorage.getItem(key)
        if (item) {
            return JSON.parse(item);
        }
    } catch (error) {
        throw error
    }
}

const setItem = (key: string, data: any): void => {
    try {
        window.localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        throw error
    }
}

const removeItem = (key: string) => {
    window.localStorage.removeItem(key);
}

export default {
    getItem,
    setItem,
    removeItem
}