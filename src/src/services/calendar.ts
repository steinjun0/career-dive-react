export const getDatesOfMonth = (yearAndMonth: Date): Array<Date> => {
    const lastDateOfMonth = new Date(yearAndMonth.getFullYear(), yearAndMonth.getMonth() + 1, 0).getDate();
    let dates = []
    for (let date = 1; date <= lastDateOfMonth; date++) {
        dates.push(new Date(yearAndMonth.getFullYear(), yearAndMonth.getMonth(), date))
    }
    return dates;
}

export const monthList = Array(6).fill(new Date()).map((e, i) => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    return new Date(year + ~~((month + i) / 12), (month + i) % 12, 1)
})

export const isToday = (date: Date) => {
    if (date.getFullYear() === new Date().getFullYear() &&
        date.getMonth() === new Date().getMonth() &&
        date.getDate() === new Date().getDate()
    )
        return true
    else
        return false
}

export const isPastDate = (date: Date) => {
    if (!isToday(date) && date < new Date()) {
        return true
    } else
        return false
}