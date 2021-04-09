import axios from 'axios';

export const setAxiosAuthToken = token => {
    if (typeof token !== "undefined" && token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
        delete axios.defaults.headers.common["Autorization"]
    }
};

export const isEmpty = value => 
value === undefined ||
value === null ||
(typeof value === "object" && Object.keys(value).length === 0) ||
(typeof value === "string" && value.trim().length === 0);

export const waveAnimation = () => {
    const labels = document.querySelectorAll('.user-sign-form-control label')

    labels.forEach(label => {
        label.innerHTML = label.innerText
            .split('')
            .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
            .join('')
    })
}