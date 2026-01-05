import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { trackScroll } from "../utils/gtag"


const useScrollTracking = () => {
 const [lastPercent,setLastPercent]=useState<number>(0)

    useEffect(()=>{
        const consent = Cookies.get('isAnalyticCookieAccept') === 'true'

        if(!consent) return;

        const onScroll = ()=>{
            const scrollTop = window.scrollY
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrolled = Math.round((scrollTop / docHeight) * 100)

            const milestones = [25,50,75,100]
            const next = milestones.find(m => m > lastPercent && scrolled >= m)
            if(next){
                trackScroll(next);
                setLastPercent(next)
            }
        }

        window.addEventListener('scroll',onscroll as EventListener)
        return () => window.removeEventListener('scroll',onScroll)
    },[lastPercent])


}

export default useScrollTracking