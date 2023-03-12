const debounce = (callback: Function, depay = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), depay);
    };
};

export default {
    debounce,
}