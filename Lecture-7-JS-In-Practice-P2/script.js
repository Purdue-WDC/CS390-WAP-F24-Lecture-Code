console.log("hello world");

let planetFormEl;
let planetFormSubmit;

document.addEventListener("DOMContentLoaded", (event) => {
    planetFormEl = document.getElementById("planetForm");
    planetFormSubmit = document.getElementById("planetFormSubmit");
    console.log(planetFormEl, planetFormSubmit);
})

const formHandler = () => {
    console.log("form has been submitted!");

    console.log(planetFormEl, planetFormSubmit)
    const data = new FormData(planetFormEl, planetFormSubmit);
    const name = data.get("planetName");
    const size = data.get("planetName");
    const color = data.get("planetColor");

    return false;
};

