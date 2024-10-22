import { useEffect, useState } from "react";

function GravitySim() {
    const [mass, setMass] = useState(0);
    const [name, setName] = useState("planet");
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        console.log(planets)
    }, [planets])

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

            <div style={{
                width: "100%",
                height: "200px",
                border: "1px solid black"
            }}>
                {planets.map((planet, idx) => {
                    return <div
                        onMouseDown={() => {
                            const new_planets = [...planets];
                            new_planets[idx].selected = true;
                            setPlanets(new_planets);
                        }}
                        onMouseUp={() => {
                            const new_planets = [...planets];
                            new_planets[idx].selected = false;
                            setPlanets(new_planets);
                        }}
                        onMouseMove={(event) => {
                            if (planet.selected) {
                                const new_planets = [...planets];
                                // Compute the new position of the planet based off the cursor's page position.
                                new_planets[idx].x = event.pageX - frameEl.offsetLeft;
                                new_planets[idx].y = event.pageY - frameEl.offsetTop;
                                // Set the new position of the planet by modifying its position relative to it parent.
                                setPlanets(new_planets);
                            }
                        }}
                        onClick={(event) => {
                            console.log(planet.name + " clicked!");
                            event.stopPropagation();
                        }}
                    >
                        {planet.name}
                        </div>;
                })}
            </div>
        </>
    );
}

export default GravitySim;