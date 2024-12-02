import {toolbar_buttons, addAvailabilityIcon} from './GlobalVar';
import {getSelectedDay} from './HomeMain-Service';

const setValue = (elem) => {
    const val = elem.currentTarget.getAttribute('id');
    const vals = toolbar_buttons.map(({id}) => id);
    const btn = toolbar_buttons.filter(b => b.id === val)[0];
    if(vals.includes(val)) {
        const selectedDayElem = getSelectedDay();
        const overlayElem = document.getElementById(`${selectedDayElem.getAttribute('id')}-overlay`);
        const labelElem = document.getElementById(`${selectedDayElem.getAttribute('id')}-label`);
        if(val === 'day') {
            selectedDayElem.setAttribute('class','calendar-day clickable day-color');
            labelElem.style.color = 'white';
            overlayElem.appendChild(addAvailabilityIcon(btn.img));
        } else if (val === 'morning') {
            selectedDayElem.setAttribute('class','calendar-day clickable morning-color');
            labelElem.style.color = 'white';
            overlayElem.appendChild(addAvailabilityIcon(btn.img));
        } else if (val === 'after-noon') {
            selectedDayElem.setAttribute('class','calendar-day clickable after-noon');
            labelElem.style.color = 'white';
            overlayElem.appendChild(addAvailabilityIcon(btn.img));
        } else {
            selectedDayElem.setAttribute('class','calendar-day clickable unavailable');
            labelElem.style.color = 'white';
            overlayElem.appendChild(addAvailabilityIcon(btn.img));
        }
    } else {
        console.error('La valeur est mauvaise');
    }
}

export const setupToolbarButtons = () => {
    const toolbar = document.getElementById('toolbar');
    for (const btn of toolbar_buttons) {
        if(document.getElementById(btn.id)){
            break;
        }
        let button = document.createElement('button');
        button.setAttribute('id', btn.id);
        button.setAttribute('class', btn.class);
        button.appendChild(addAvailabilityIcon(btn.img));
        button.addEventListener('click', setValue);
        toolbar.appendChild(button)
    }
}

export const removeToolbarButtons = () => {
    toolbar_buttons.forEach(btn => {
        let elem = document.getElementById(btn.id);
        if(elem) {
            elem.remove();
        }
    });
}

export const setupToolbarUserHint = () => {
    const toolbar = document.getElementById('toolbar');
    const p = document.createElement('p');
    p.setAttribute('id', 'user-hint');
    p.appendChild(document.createTextNode('Selectionnez un jour'));
    toolbar.appendChild(p);
}

export const removeToolbarUserHint = () => {
    const toolbar_user_hint = document.getElementById('user-hint');
    if(toolbar_user_hint) {
        toolbar_user_hint.remove();
    }
}
