export default (time: string | Date | number) => {
    const recieved = new Date(time).getTime()
    const now = Date.now()
    const ago = now - recieved
    const second = 1000
    const minute = 60 * second
    const hour = 60 * minute
    const day = 24 * hour
    const month = 30 * day
    const year = 365 * day
    const variables: any = {
        year,
        month,
        day,
        hour,
        minute,
    }
    return Object.keys(variables).reduce((result: string, key: string, _, array) => {
        if(ago > variables[key]) {
            array.splice(0)
            const a = Math.floor(ago / variables[key])
            return `${a} ${key}${a > 1 ? 's': ''} ago`
        }
        return result;
    }, "a seconds ago")
}