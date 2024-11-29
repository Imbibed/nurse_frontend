
const {BehaviorSubject, Subject} = rxjs;

export const selectedDaySubject = new BehaviorSubject(null);

export  const monthAndYearFilterValueSubject = new Subject({month:0, year:0});

let selectedDay = null;

let monthAndYearFilterValue = null;

export const getSelectedDay = () => {
    return selectedDay;
}

export const setSelectedDay = (elem) => {
    selectedDay = elem;
}

export const getMonthAndYearFilterValue = () => {
    return monthAndYearFilterValue;
}

export const setMonthAndYearFilterValue = (val) => {
    monthAndYearFilterValue = val;
}