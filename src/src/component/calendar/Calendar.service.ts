export const getDatesOfMonth = (yearAndMonth: Date): Array<Date> => {
    const lastDateOfMonth = new Date(yearAndMonth.getFullYear(), yearAndMonth.getMonth() + 1, 0).getDate();
    let dates = []
    for (let date = 1; date <= lastDateOfMonth; date++) {
        dates.push(new Date(yearAndMonth.getFullYear(), yearAndMonth.getMonth(), date))
    }
    return dates;
}