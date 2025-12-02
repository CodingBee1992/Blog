import { useEffect, useState } from "react"

interface WindowSize{
    width:number,
    height:number
}


const useWindowSize = () => {
    const [windowSize,setWindowSize] = useState<WindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    })


    useEffect(()=>{
        let timeOutId: ReturnType<typeof setTimeout> | null = null;
        

        const handleResize = ()=>{
            if(timeOutId) clearTimeout(timeOutId)

                timeOutId = setTimeout(() => {
                    setWindowSize({
                        width: window.innerWidth,
                        height: window.innerHeight
                    })
                }, 200);
        }

        window.addEventListener('resize', handleResize)
        // handleResize()

        return ()=>{
            if(timeOutId) clearTimeout(timeOutId)
                window.removeEventListener('resize',handleResize)
        }

    },[])

  return windowSize
}

export default useWindowSize