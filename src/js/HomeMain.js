import { selectedDaySubject, setSelectedDay, getSelectedDay, monthAndYearFilterValueSubject, getMonthAndYearFilterValue, setMonthAndYearFilterValue } from './HomeMain-Service';
import { setupCalendarHeader, configForm } from "./CalendarManager";
import { removeToolbarUserHint, setupToolbarButtons, removeToolbarButtons, setupToolbarUserHint  } from "./ToolbarManager";

selectedDaySubject.subscribe({
    next: (dayOfMonthElem) => {
        if(dayOfMonthElem) {
            getSelectedDay()?.classList.remove('selected');
            setSelectedDay(dayOfMonthElem);
            getSelectedDay().classList.add('selected');
            removeToolbarUserHint();
            setupToolbarButtons();
        } else {
            setupToolbarUserHint();
            removeToolbarButtons();
        }
    },
    error: err => console.error(err)
});

monthAndYearFilterValueSubject.subscribe({
    next: ({month, year}) => {
        const form = document.getElementById('calendar');
    
        //  clean calendar form
        while(form.firstChild){
            form.removeChild(form.firstChild);
        }
        setMonthAndYearFilterValue({month: month, year: year});
        configForm(month, year);
    },
    error: err => console.error(err)
})

const selectCurrentDay = (elem) => {
    if(elem){
        selectedDaySubject.next(elem);
    }
}

(function() {
    const monthSelect = document.getElementById('month-filter');
    const yearSelect = document.getElementById('year-filter');
    const now = new Date();
    setMonthAndYearFilterValue({month: now.getMonth(),year: now.getFullYear()});

    //  addEventListener on dropdowns
    monthSelect.addEventListener('change', (e) => {
        monthAndYearFilterValueSubject.next({month: e.currentTarget.value, year: getMonthAndYearFilterValue().year});
    });
    yearSelect.addEventListener('change', (e) => {
        monthAndYearFilterValueSubject.next({month: getMonthAndYearFilterValue().month, year: e.currentTarget.value});
    });

    monthAndYearFilterValueSubject.next({month: now.getMonth(), year: now.getFullYear()});

    //  fill and setup dropdown month filter
    const monthOption = document.getElementById(`month-${getMonthAndYearFilterValue().month}`);
    monthOption.setAttribute('selected', 'selected');

    //  fill and setup dropdown year filter
    for(var i = getMonthAndYearFilterValue().year - 3; i <= getMonthAndYearFilterValue().year + 3; i++) {
        var option = document.createElement('option');
        option.setAttribute('value', `${i}`);
        option.appendChild(document.createTextNode(`${i}`));
        if(i === getMonthAndYearFilterValue().year) {
            option.setAttribute('selected','selected');
        }
        yearSelect.appendChild(option);
    }

    //  fill calendar header
    setupCalendarHeader();

    //  Select current day
    const currentDayOfMonthFromCalendar = document.getElementById(`day-${now.getDate()}`);
    selectCurrentDay(currentDayOfMonthFromCalendar);
})()