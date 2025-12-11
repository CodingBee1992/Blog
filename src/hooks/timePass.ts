

const timePass = (value:string,days:number) => {
    const currentTime = new Date().getTime()
    const time = new Date(value).getTime()
    const passedDays = days * 24 * 60 * 60 * 1000
    const elapsedTime = time + passedDays

    return elapsedTime > currentTime
    
}

export default timePass