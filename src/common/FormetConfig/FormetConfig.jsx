export const DateFormet = (dateInput) => {
    const date = new Date(dateInput);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthString = monthNames[month];
    return `${day}  ${monthString} ${year}`;
};


export const BetweenCalculation = (lastMonth, thisMonth) =>
    Math.abs(Number(lastMonth) - Number(thisMonth));


export const BoolenCalculation = (lastMonth, thisMonth) =>
    Math.abs(Number(lastMonth) > Number(thisMonth)) ? true : false


export const getBetweenMonthlyDifference = (thisMonthValue, totalValue) => {
    const thisMonth = Number(thisMonthValue) || 0;
    const total = Number(totalValue) || 0;
    const lastMonth = total - thisMonth;

    return Math.abs(thisMonth - lastMonth);
};


export const getRatingLabel = (rating) => {
    const stars = rating;
    if (stars == 5) return "Excellent"
    if (stars >= 4) return "Good";
    if (stars === 3) return "Average";
    if (stars === 2) return "Poor";
    return "Poor";
}


export const getStarPercentages = (dispersionOfStars = {}) => {
    const total = Object.values(dispersionOfStars).reduce(
        (sum, val) => sum + (Number(val) || 0),
        0
    );

    const calculate = (value) =>
        total === 0 ? "0.0" : ((value / total) * 100).toFixed(0);

    return [
        calculate(dispersionOfStars.fiveStart || 0),
        calculate(dispersionOfStars.fourStart || 0),
        calculate(dispersionOfStars.threeStart || 0),
        calculate(dispersionOfStars.twoStart || 0),
        calculate(dispersionOfStars.oneStart || 0),
    ];
};
