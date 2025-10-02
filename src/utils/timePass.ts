export function has24HoursPassed(value: string | null | undefined) {
    if (value) {
        const currentTime = new Date().getTime()
        const elapsedTime = currentTime - parseInt(value, 10)

        const twentyFourHours = 24 * 60 * 60 * 1000
        return elapsedTime >= twentyFourHours;
    } else {
        return false;
    }
}