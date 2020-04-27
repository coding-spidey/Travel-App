function countDays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    return(Math.round((endDate-startDate) / oneDay))
}
export{ countDays }