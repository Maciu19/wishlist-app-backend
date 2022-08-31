function getMinutesDiff(startDate, endDate) {
    const msInHour = 1000 * 60;
    return Math.round(Math.abs(endDate - startDate) / msInHour);
}

export default getMinutesDiff;