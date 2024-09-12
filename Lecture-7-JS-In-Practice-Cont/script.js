// Constants.
const TIME_STEP = 0.02;
const G = 0.1;

// Element references.
let frameEl;
let formEl;
let formSubmitEl;

// Since the script may run before our HTML finishes rendering,
// we must wait until the onDOMContentLoaded event is triggered
// in order to save a reference to each element.
document.addEventListener("DOMContentLoaded", () => {
    frameEl = document.getElementById("frame");
    formEl = document.getElementById("form");
    formSubmitEl = document.getElementById("formSubmit");

    frameEl.addEventListener("click", () => {
        console.log("frame clicked!");
        initFramePlayPause();
    })

    // createPlanet("Moon", 100, "gray");
});

// Variables for application state.
const planets = [];
let play = false;
let currentInterval;
let lastClickedElement;

const createPlanet = (name, size, color) => {
    // Call renderPlanet to create the planet's HTML element and attach it to the DOM.
    const planetEl = renderPlanet(name, size, color);

    // Create object for the planet and add it to the planets array
    // so we can track and modify its values in the future.
    const planet = {
        name,
        size,
        mass: size * size * size,
        color,
        selected: false,
        element: planetEl,
        x: size / 2,
        y: size / 2,
        xforce: 0,
        yforce: 0,
        xvelocity: 0,
        yvelocity: 0,
    };
    planets.push(planet);

    // Add event listeners to the planet element so we can move
    // the planet via drag & drop.
    initPlanetDragAndDrop(planet);
};

// Create HTML Elements for a planet and mount them to the DOM.
const renderPlanet = (name, size, color) => {
    // Add planet element.
    const planetEl = document.createElement("div");
    planetEl.classList.add("planet");
    planetEl.style.width = size + "px";
    planetEl.style.height = size + "px";
    planetEl.style.backgroundColor = color;
    frameEl.appendChild(planetEl); // attach the planet element to the DOM via the frame element.
    // Add planet name.
    const nameEl = document.createElement("div");
    nameEl.classList.add("planetName");
    nameEl.textContent = name;
    planetEl.appendChild(nameEl); // attach the name element to the DOM via the planet element.
    // Return element for entire planet.
    return planetEl;
};

// Set events to move the planet via drag and drop.
const initPlanetDragAndDrop = (planet) => {
    planet.element.onmousedown = () => {
        planet.selected = true;
    };
    planet.element.onmouseup = () => {
        planet.selected = false;
    };
    planet.element.onmousemove = (event) => {
        if (planet.selected) {
            // Compute the new position of the planet based off the cursor's page position.
            planet.x = event.pageX - frameEl.offsetLeft;
            planet.y = event.pageY - frameEl.offsetTop;
            // Set the new position of the planet by modifying its position relative to it parent.
            updatePlanetCSSPosition(planet);
        }
    };
    planet.element.onclick = (event) => {
        console.log(planet.name + " clicked!");
        event.stopPropagation();
    };
};

// Form submit handler. 
const onPlanetFormSubmit = () => {
    // get form data and extract properties.
    const formData = new FormData(formEl, formSubmitEl);
    const name = formData.get("planetName");
    const size = formData.get("planetSize");
    const color = formData.get("planetColor");
    console.log({name,size,color})

    // validate fields
    if (!name || !size || !color) {
        alert("Cannot create a planet with an invalid field.");
        return false;
    }
    if (planets.find(x => x.name === name)) {
        alert("Cannot create a planet with the same name.");
        return false;
    }

    createPlanet(name, size, color);
    
    return false; // remember to return false for form submit handlers so the page does not reload.
};

// set planet css position to be x and y so we can actually see the position change.
const updatePlanetCSSPosition = (planet) => {
    planet.element.style.left = (planet.x - planet.size / 2) + "px";
    planet.element.style.top = (planet.y - planet.size / 2) + "px";
};

// Delete planet handlers.
window.addEventListener("click", (event) => {
    lastClickedElement = event.target;
}, true);

window.addEventListener("keydown", (event) => {
    if (event.key === 'd') {
        deleteLastClickedPlanet();
    } else if (event.key === 'r') {
        for (const planet of planets) {
            planet.x = planet.size / 2;
            planet.y = planet.size / 2;
            updatePlanetCSSPosition(planet);
        }
    }
});

const deleteLastClickedPlanet = () => {
    if (!lastClickedElement) return;
    if (!lastClickedElement.classList.contains("planet")) return;

    const planetIdx = planets.findIndex(x => x.element === lastClickedElement);
    const planet = planets[planetIdx];
    planet.element.remove();
    planets.splice(planetIdx, 1);
};

// Play/pause handler.
const initFramePlayPause = () => {
    if (play) {
        clearInterval(currentInterval);
        play = false;
    } else {
        currentInterval = setInterval(simulateTimeStep, TIME_STEP * 1000);
        play = true;
    }
};

// For complex functions, I suggest writing a ton of comments,
// including an action plan, and console.log statements
// to keep your logic in check and code on the right track.
// Action plan:
//  - Compute total force applied on a planet by every other planet at the current time. (do this for all planets).
//  - Apply the force to the currently velocity over the given time.
//  - Apply the new velocity to the position over the given time.
//  - Move each planet to be where the x and y indicate.
const simulateTimeStep = () => {
    console.log("performing time step")

    // compute total force for each planet.
    for (const i in planets) {
        for (const j in planets) { 
            if (i === j) continue;

            const xd = planets[i].x - planets[j].x;
            const yd = planets[i].y - planets[j].y;
            const distance = Math.sqrt(xd * xd + yd * yd);
            const force = G * (planets[i].mass * planets[j].mass) / (distance * distance);
            const xforce = (xd / distance) * force;
            const yforce = (yd / distance) * force;

            planets[i].xforce -= xforce;
            planets[i].yforce -= yforce;
            planets[j].xforce += xforce;
            planets[j].yforce += yforce;
        }
    }

    for (const planet of planets) {
        // apply force to velocity, and velocity to position.
        const xaccel = planet.xforce / planet.mass;
        const yaccel = planet.yforce / planet.mass;
        planet.xvelocity += xaccel * TIME_STEP;
        planet.yvelocity += yaccel * TIME_STEP;
        planet.x += planet.xvelocity * TIME_STEP;
        planet.y += planet.yvelocity * TIME_STEP;

        // set new position in DOM.
        updatePlanetCSSPosition(planet);

        // then reset force for the next iteration.
        planet.xforce = 0;
        planet.yforce = 0;
    }
};
