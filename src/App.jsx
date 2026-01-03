import React, { useRef, useState } from "react";
import { planets } from "./js/planets.js";
import "./scss/main.scss";

function App() {
  const inputRef = useRef(null);
  const weightRef = useRef(null);
  const [planet, setPlanet] = useState({
    name: "Saturn",
    mass: "5.68 × 10²⁶ kg",
    gravity: 10.44,
    radius: "58,232 km",
    weightRatio: 1.06,
    funFact: "Saturn could float in water if a bathtub big enough existed.",
    image: "/images/saturn.png",
  });
  const [message, setMessage] = useState(true);
  const [objectWeight, setObjectWeight] = useState(0);

  const handleSearch = (input) => {
    console.log(input);
    const planetDetails = planets.find(
      (planet) => planet.name.toLowerCase() === input.toLowerCase()
    );
    if (planetDetails) {
      setMessage(true);
      setPlanet(planetDetails);
    } else {
      setMessage(false);
    }
  };

  const handleWeight = (earthMass) => {
    if (!planet) return;
    const weightOnPlanet = (Number(earthMass) * planet.weightRatio).toFixed(0);
    setObjectWeight(weightOnPlanet);
  };

  return (
    <div className="page">
      <header>
        <h1>
          Explore the <span className="text-highlight">Solar System</span>
        </h1>
        <p className="text-highlight">
          Planets, mass and scale - interactivity
        </p>
      </header>
      <main>
        <div className="search">
          <select ref={inputRef} className="select-planets">
            <option value="Mercury">Mercury</option>
            <option value="Venus">Venus</option>
            <option value="Earth">Earth</option>
            <option value="Mars">Mars</option>
            <option value="Jupiter">Jupiter</option>
            <option value="Saturn" selected>
              Saturn
            </option>
            <option value="Uranus">Uranus</option>
            <option value="Neptune">Neptune</option>
          </select>
          <button
            className="button search-btn"
            onClick={(e) => {
              e.preventDefault();
              handleSearch(inputRef.current.value);
            }}
          >
            Search
          </button>
        </div>
        {message ? (
          <div className="result">
            <div className="planet-details-card">
              <h2 className="text-highlight">{planet.name}</h2>
              <img src={planet.image} alt={planet.name} />
              <div className="details">
                <ul>
                  <li>Mass: {planet.mass}</li>
                  <li>Gravity: {planet.gravity}</li>
                  <li>Radius: {planet.radius}</li>
                  <li>Fun Fact: {planet.funFact}</li>
                </ul>
              </div>
            </div>
            <div className="planet-weight-card">
              <h2>Your weight on {planet.name}</h2>
              <input
                type="number"
                placeholder="Enter your weight in kg"
                ref={weightRef}
              />
              <button
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleWeight(weightRef.current.value);
                }}
              >
                Calculate
              </button>

              <h3>On {planet.name} you would weigh:</h3>
              <p>{objectWeight}</p>
            </div>
          </div>
        ) : (
          <div className="result">
            <h2>Please select a planet</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
