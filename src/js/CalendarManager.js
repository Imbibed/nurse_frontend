import { daysOfTheWeekToString  } from "./GlobalVar";
import {selectedDaySubject} from "./HomeMain-Service";

Date.prototype.isLocalDateAfterOrEqual = function(date) {
    if (!(date instanceof Date)) {
        throw new TypeError('L’argument doit être une instance de Date');
    }
    const thisDate = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const otherDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return thisDate.getTime() >= otherDate.getTime();
}

export const initDaysInMonthRange = (month , year) => {
    const daysOfMonth = [];
    //  to be sure month and year are numbers instead of this month + 1 = 111
    const num_month = new Number(month);
    const num_year = new Number(year);
    const startDay = new Date(num_year, num_month, 1).getDay();
    const offset = (startDay === 0) ? 6 : startDay - 1;
    for (let i = 0; i < offset; i++) {
        daysOfMonth.push(null); // null représente une case vide
    }
    for(var d = new Date(num_year, num_month, 1); d <= new Date(num_year, num_month + 1, 0); d.setDate(d.getDate() + 1)){
        daysOfMonth.push(new Date(d));
    }
    return daysOfMonth;
}

export const setupCalendarHeader = () => {
    const header = document.getElementById('calendar-header');
    const orderedCalendarDays = [...daysOfTheWeekToString];
    orderedCalendarDays.splice(orderedCalendarDays.length, 0, 'Dimanche');
    orderedCalendarDays.shift();
    orderedCalendarDays.forEach(day => {
        let hday = document.createElement('label');
        hday.appendChild(document.createTextNode(day.substring(0,3)));
        header.appendChild(hday);
    });
}

export const configForm = (month, year) => {
    const daysOfMonth = initDaysInMonthRange(month, year);
    const now = new Date();
    const form = document.getElementById('calendar');
    let d = 1;
    daysOfMonth.forEach( (date) => {
        const div = document.createElement('div');

        div.setAttribute('class', 'calendar-day');
        if(date !== null){
            div.setAttribute('id', `day-${d}`);
            const label1 = document.createElement('label');
            label1.setAttribute('id',`day-${d}-label`);
            label1.appendChild(
                document.createTextNode(`${date.getDate()}`)
            );
            div.appendChild(label1);
            
            let askedDate = new Date(year, month, d);

            if(askedDate.isLocalDateAfterOrEqual(now)) {
                div.classList.add('clickable');
                div.addEventListener('click', (event => {
                    selectedDaySubject.next(event.currentTarget);
                }));
            }

            const overlay = document.createElement('div');
            overlay.setAttribute('id', `day-${d}-overlay`);
            overlay.setAttribute('class', `overlay`);
            div.appendChild(overlay);
            d++;
        }
        
        form.appendChild(div);
    });
}