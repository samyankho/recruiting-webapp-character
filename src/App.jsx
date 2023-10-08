import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { CHARACTER_API_URL } from "./consts.js";
import { initCharacter, calculateTotalSkillPoints } from "./utils/shareHelper";
import Attributes from "./components/Attributes";
import Skills from "./components/Skills";
import Class from "./components/Class";
import Requirements from "./components/Requirements";
import SkillCheck from "./components/SkillCheck";

function App() {
  const [characters, setCharacters] = useState([initCharacter()]);
  const [showRequirements, setShowRequirements] = useState("");
  const [skillCheckResult, setSkillCheckResult] = useState({});

  useEffect(() => {
    getCharacterData();
  }, []);

  const getCharacterData = async () => {
    try {
      const response = await axios.get(CHARACTER_API_URL);
      if (response?.status === 200) {
        setCharacters(response?.data?.body?.characters);
      }
    } catch (error) {
      console.error("An error occurred while getting character data:", error);
    }
  };

  const addCharacter = () => {
    setCharacters([...characters, initCharacter()]);
  };

  const resetCharacter = () => {
    setCharacters([initCharacter()]);
    setSkillCheckResult({});
  };

  const saveCharacterData = async () => {
    try {
      const response = await axios.post(
        CHARACTER_API_URL,
        { characters },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Character data saved successfully.");
        alert("Character data saved successfully.");
      }
    } catch (error) {
      console.error("An error occurred while saving character data:", error);
    }
  };

  const addAttributePoints = (attribute, index) => {
    const totalAttributePoints = Object.values(
      characters[index].attributes
    ).reduce((acc, val) => acc + val, 0);

    if (totalAttributePoints >= 70) {
      alert("A Character can have up to 70 Attribute points");
      return;
    }

    const updatedCharacters = [...characters];
    updatedCharacters[index].attributes[attribute]++;
    setCharacters(updatedCharacters);
  };

  const reduceAttributePoints = (attribute, index) => {
    if (characters[index].attributes[attribute] === 0) return;
    const updatedCharacters = [...characters];
    updatedCharacters[index].attributes[attribute]--;
    setCharacters(updatedCharacters);
  };

  const addSkillPoints = (skill, index) => {
    const totalPoints = Object.values(characters[index].skills).reduce(
      (acc, val) => acc + val,
      0
    );
    const updatedCharacters = [...characters];
    const pointsLimit = calculateTotalSkillPoints(characters[index].attributes);
    if (totalPoints >= pointsLimit) {
      alert(
        "You need more skill points! Upgrade Intelligence Attribute to get more"
      );
      return;
    }
    updatedCharacters[index].skills[skill]++;
    setCharacters(updatedCharacters);
  };

  const reduceSkillPoints = (skill, index) => {
    if (characters[index].skills[skill] === 0) return;
    const updatedCharacters = [...characters];
    updatedCharacters[index].skills[skill]--;
    setCharacters(updatedCharacters);
  };

  const SkillCheckResultDisplay = () => {
    return (
      skillCheckResult?.rollValue && (
        <div>
          <h2>Skill Check Result</h2>
          <h4>Character: {skillCheckResult.index + 1}</h4>
          <div>
            Skill: {skillCheckResult.skill}: {skillCheckResult.skillValue}
          </div>
          <div>You Rolled: {skillCheckResult.rollValue}</div>
          <div>The DC was: {skillCheckResult.DC}</div>
          <div>
            Skill Check Result:{" "}
            {skillCheckResult.skillValue + skillCheckResult.rollValue >=
            skillCheckResult.DC
              ? "Successful"
              : "Failure"}
          </div>
        </div>
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

      <div className="container">
        <button className="btn btn-primary m-2" onClick={() => addCharacter()}>
          Add New Character
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => resetCharacter()}
        >
          Reset All Character
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => saveCharacterData()}
        >
          Sava All Character
        </button>

        <SkillCheckResultDisplay />

        {characters.map((character, index) => (
          <div className="row mt-5" key={index}>
            <h3>Character: {index + 1}</h3>
            <SkillCheck
              index={index}
              skills={character.skills}
              attributes={character.attributes}
              setSkillCheckResult={setSkillCheckResult}
            />
            <Attributes
              index={index}
              attributes={character.attributes}
              addAttributePoints={addAttributePoints}
              reduceAttributePoints={reduceAttributePoints}
            />
            <Class
              attributes={character.attributes}
              setShowRequirements={setShowRequirements}
            />
            {showRequirements && (
              <Requirements
                showRequirements={showRequirements}
                setShowRequirements={setShowRequirements}
              />
            )}
            <Skills
              index={index}
              skills={character.skills}
              attributes={character.attributes}
              addSkillPoints={addSkillPoints}
              reduceSkillPoints={reduceSkillPoints}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
