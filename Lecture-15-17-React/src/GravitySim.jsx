import { useEffect, useRef, useState } from "react";

import './GravitySim.css';

const TIME_STEP = 0.02;
const G = 10;

const simulateTimeStep = (planets) => {
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

        // then reset force for the next iteration.
        planet.xforce = 0;
        planet.yforce = 0;
    }

    return [...planets];
};

function GravitySim() {
    const [mass, setMass] = useState(100);
    const [name, setName] = useState("planet");
    const [planets, setPlanets] = useState([]);
    const [play, setPlay] = useState(false);
    const frameElRef = useRef();
    const intervalRef = useRef();

    const [selectedPlanet, setSelectedPlanet] = useState(null);

    useEffect(() => {
        console.log({planets});
    }, [planets])

    useEffect(() => {
    }, []);

    const handleFormSubmit = () => {
        if (planets.find(x => x.name == name)) {
            alert("planets cannot have duplicate names")
            return;
        }

        const new_planets = [ ...planets ];
        new_planets.push({
            name,
            mass,
            x: 0,
            y: 0,
            xforce: 0,
            yforce: 0,
            xvelocity: 0,
            yvelocity: 0,
            selected: false
        });
        setPlanets(new_planets);
    };

    return (
        <>
            <div>
                <input
                    type="number"
                    value={mass}
                    onChange={(e) => {
                        setMass(e.target.value)
                    }}
                >
                </input>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                >
                </input>

                <button
                    onClick={handleFormSubmit}
                >
                    Submit
                </button>
            </div>

            <div
                style={{
                    width: "100%",
                    height: "200px",
                    border: "1px solid black"
                }}
                id="frame"
                ref={frameElRef}
                onClick={() =>{
                    if (play) {
                        clearInterval(intervalRef.current);
                        setPlay(false);
                    } else {
                        intervalRef.current = setInterval(() => {
                            setPlanets(simulateTimeStep(planets));
                        }, TIME_STEP * 1000);
                        setPlay(true);
                    }
                }}
            >
                {planets.map((planet, idx) => {
                    return <div
                        className="planet"
                        style={{
                            width: planet.mass + "px",
                            height: planet.mass + "px",
                            backgroundColor: 'blue',
                            left: (planet.x - planet.mass / 2) + "px",
                            top: (planet.y - planet.mass / 2) + "px"
                        }}
                        onMouseDown={() => {
                            setSelectedPlanet(idx);
                        }}
                        onMouseUp={() => {
                            setSelectedPlanet(null);
                        }}
                        onMouseMove={(event) => {
                            if (selectedPlanet === idx) {
                                const new_planets = [...planets];
                                // Compute the new position of the planet based off the cursor's page position.
                                new_planets[idx].x = event.pageX - frameElRef.current.offsetLeft;
                                new_planets[idx].y = event.pageY - frameElRef.current.offsetTop;
                                // Set the new position of the planet by modifying its position relative to it parent.
                                setPlanets(new_planets);
                            }
                        }}
                        onClick={(event) => {
                            console.log(planet.name + " clicked!");
                            event.stopPropagation();
                        }}
                    >
                        <div className="planetName">
                            {planet.name}
                        </div>
                    </div>;
                })}
            </div>
        </>
    );
}

export default GravitySim;