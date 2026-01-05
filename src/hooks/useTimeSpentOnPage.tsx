import { useEffect, useState } from "react"


const useTimeSpentOnPage = () => {
  const [startTime,setStartTime]= useState<number | null>(null)
  const [timeSpent,setTimeSpent]= useState<number>(0)

  useEffect(()=>{
    const start = Date.now()

    setStartTime(start)

    if(startTime !== null){
        const end = Date.now()

        const spentTime = Math.round((end - startTime) / 1000)
        setTimeSpent(spentTime)
    }
  },[startTime])


  return timeSpent
}

export default useTimeSpentOnPage