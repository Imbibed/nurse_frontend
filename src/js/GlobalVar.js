export const daysOfTheWeekToString = [
    'Dimanche', 
    'Lundi', 
    'Mardi', 
    'Mercredi', 
    'Jeudi', 
    'Vendredi', 
    'Samedi'
];
export const monthsOfTheYear = [
    'Janvier', 
    'Février', 
    'Mars', 
    'Avril', 
    'Mai', 
    'Juin', 
    'Juillet', 
    'Août', 
    'Septembre', 
    'Octobre', 
    'Novembre', 
    'Décembre'
];

export const toolbar_buttons = [
    {
        id: 'day', 
        class: 'clickable day-color', 
        img: {alt: 'journée', src:'./assets/icons/sun.svg', width: 32, height: 32}
    },
    {
        id: 'morning', 
        class: 'clickable morning-color', 
        img: {alt: 'matin', src:'./assets/icons/sun-morning.svg', width: 32, height: 32}
    },
    {
        id: 'after-noon', 
        class: 'clickable after-noon', 
        img: {alt: 'apres-midi', src:'./assets/icons/sun-afternoon.svg', width: 32, height: 32}
    },
    {
        id: 'unavailable', 
        class: 'clickable unavailable', 
        img: {alt: 'non disponible', src:'./assets/icons/day-off.svg', width: 32, height: 32}
    }
];

export const addAvailabilityIcon = (img) => {
    const {alt, src, width, height} = img;
    let img_tag = document.createElement('img');
    img_tag.setAttribute('alt', alt);
    img_tag.setAttribute('src', src);
    img_tag.setAttribute('width', width);
    img_tag.setAttribute('height', height);
    return img_tag
};