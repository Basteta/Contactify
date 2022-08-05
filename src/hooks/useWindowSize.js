import {useState, useEffect} from "react";

//Custom hook to get current size of the browser window

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({width: undefined, height: undefined});

    useEffect (() => {
        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

