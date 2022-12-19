import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';

type WithChildren = {
    children: ReactNode
}

interface ScreenWidthValue {
    screenWidth: number
    isDesktopView: boolean
}

const ScreenWidthContext = createContext<ScreenWidthValue | null>(null)

const ScreenWidthProvider:FC<WithChildren> = ({ children }) =>  {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const callback = () => setScreenWidth(window.innerWidth)

    const isDesktopView = screenWidth > 1086;

    useEffect(() => {
        window.addEventListener("resize", callback)

        return () => window.removeEventListener("resize", callback)
    },[])

        return (

        <ScreenWidthContext.Provider value={{
            screenWidth: screenWidth,
            isDesktopView: isDesktopView
        }}>
            {children}
        </ScreenWidthContext.Provider>
    )
}

function useScreenWidth() {
    const context = useContext(ScreenWidthContext);
    if (context === null) {
        throw new Error("useTheme must be used with ScreenWidthProvide")
    }
    else {
        return context
    }
}


export {useScreenWidth, ScreenWidthProvider}