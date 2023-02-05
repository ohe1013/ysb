import useLocalStorage from "./useLocalStorage";

const useInput = (key: string, initValue: any) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const reset = () => setValue(initValue);

    const attributObj = {
        value,
        onChange: (e: any) => setValue(e.target.value),
    };
    return [value, reset, attributObj];
};

export default useInput;
