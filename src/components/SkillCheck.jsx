import { SKILL_LIST } from "../consts";
import React, { useState } from "react";
import { calculateModifier } from "../utils/shareHelper";

const SkillCheck = ({ index, attributes, skills, setSkillCheckResult }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [DC, setDC] = useState(0);

  const fireRoll = () => {
    const randomNumber = Math.ceil(Math.random() * 20);
    const skillAttribute = SKILL_LIST.find(
      (skill) => skill.name === selectedSkill
    )?.attributeModifier;
    const skillModifier = calculateModifier(attributes, skillAttribute);

    setSkillCheckResult({
      index: index,
      skill: selectedSkill,
      skillValue: skills[selectedSkill] + skillModifier,
      rollValue: randomNumber,
      DC,
    });
  };

  return (
    <div className="border">
      <h2>Skill Check</h2>
      <div>
        Skill:{" "}
        <select onChange={e => setSelectedSkill(e.target.value)}>
          {SKILL_LIST.map(skill => (
            <option value={skill.name} key={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
        DC:{" "}
        <input
          type="number"
          value={DC}
          onChange={e => setDC(e.target.value)}
        ></input>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => fireRoll()}
        >
          Roll
        </button>
      </div>
    </div>
  );
};

export default SkillCheck;
