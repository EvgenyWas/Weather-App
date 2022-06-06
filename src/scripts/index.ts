import { SetWeatherDetails } from './classes/SetWeatherDetails';
import { SetIcon } from './classes/SetIcon';
import { TDetails, TPosition } from './types/types';
import { getDetails, moveClassDNone, setPendingMessage } from './utility';

const inputPart = document.querySelector<HTMLDivElement>('.input-part');
const weatherPart = document.querySelector<HTMLDivElement>('.weather-part');
const inputAlert = document.querySelector<HTMLDivElement>('.alert-success')
const input = document.querySelector<HTMLInputElement>('.form-control');
const searchBtn = document.querySelector<HTMLButtonElement>('#button-addon2');
const getLocationBtn = document.querySelector<HTMLButtonElement>('#getLocationBtn');
const weatherIcon = document.querySelector<HTMLImageElement>('.weather-part__icon');
const backBtn = document.querySelector<HTMLElement>('.turn-back');

const APIkey: string = '081640755f0c664cd1da321a7b03bcc8';
let url: string;

input.addEventListener('keydown', (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && input.value !== '') requestApi(input.value);
});

searchBtn.addEventListener('click', () => {
    if (input.value !== '') requestApi(input.value);
});

getLocationBtn.addEventListener('click', () => {
    navigator.geolocation ?
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
    : alert("Your browser doesn't support geolocation API");
});

backBtn.addEventListener('click', () => {
    moveClassDNone([weatherPart, backBtn], [inputPart]);
});

function onSuccess(position: TPosition) {
    const {latitude, longitude} = position.coords;

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`;
    setPendingMessage(inputAlert);
    setDetails();
}

function onError(error: GeolocationPositionError) {
    inputAlert.innerText = error.message;
    moveClassDNone([inputAlert], []);
    inputAlert.classList.add('alert-danger');
}

function requestApi(city: string) {
    url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
    setPendingMessage(inputAlert);
    setDetails();
};

async function setDetails() {
    const info: TDetails = await getDetails(url);
    
    if (info.cod === '404') {
        inputAlert.classList.add('alert-danger');
        inputAlert.innerText = `'${input.value}' isn't a valid city name`;
    } else {
        const { id } = info.weather[0];

        // using custom weather icon according to the id which api gives to us
        const setIcon = new SetIcon(weatherIcon, id);
        setIcon.format();

        //passing a particular weather info to a particular element
        const setDetails = new SetWeatherDetails(weatherPart, info);
        setDetails.format();

        moveClassDNone([inputPart, inputAlert], [backBtn, weatherPart]);
    };
};