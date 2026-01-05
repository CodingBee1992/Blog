import { useEffect, useState } from "react"
import { Navigate } from "react-router"


const PageNotFoundTemplate = () => {
    const [redirect,setRedirect]=useState<boolean>(false)

    useEffect(()=>{
        setTimeout(() => {
            setRedirect(true)
        }, 2000);

        if(redirect === true){
            setRedirect(false)
        }
    },[redirect])

    if(redirect){
        return <Navigate to='/' replace/>
    }

  return (
    <div>PageNotFoundTemplate</div>
  )
}

export default PageNotFoundTemplate