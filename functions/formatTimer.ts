export default (time: number | null): string => {
    if(!time) return '00:00:00'

    const hours = Math.floor((time / 3600)).toString().padStart(2, '0')
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0')
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}