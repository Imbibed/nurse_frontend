import { daysOfTheWeekToString  } from "./GlobalVar";
import {selectedDaySubject} from "./HomeMain-Service";

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
    
    const form = document.getElementById('calendar');
    let d = 1;
    daysOfMonth.forEach( (date, index) => {
        const div = document.createElement('div');

        div.setAttribute('class', 'calendar-day');
        if(date !== null){
            div.classList.add('clickable');
            div.setAttribute('id', `day-${d}`);
            const label1 = document.createElement('label');
            label1.appendChild(
                document.createTextNode(`${date.getDate()}`)
            );
            div.appendChild(label1);
            d++;
        }
        div.addEventListener('click', (event => {
            selectedDaySubject.next(event.target);
        }));
        form.appendChild(div);
    });
}

/*export const refreshForm = (elem) => {
    const form = document.getElementById('calendar');
    
    //  clean calendar form
    while(form.firstChild){
        form.removeChild(form.firstChild);
    }

    //  setup global variable
    if(elem.getAttribute('id') === 'month-filter') {
        monthFilterValue = document.getElementById('month-filter').value;
    } else {
        yearFilterValue = document.getElementById('year-filter').value;
    }

    //  fill calendar form
    configForm(monthFilterValue, yearFilterValue);
}*/