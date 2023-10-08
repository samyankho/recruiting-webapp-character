import { calculateTotalSkillPoints, calculateModifier } from "../utils/shareHelper";
import { SKILL_LIST } from "../consts";

const Skills = ({ index, attributes, skills, addSkillPoints, reduceSkillPoints }) => {
  return (
    <div className="col-sm border">
      <h2>Skills</h2>
      <div>
        Total Points: {calculateTotalSkillPoints(attributes)}
      </div>
      <ul className="list-group">
        {SKILL_LIST.map((skill) => (
          <li key={skill.name} className="list-group-item d-flex">
            {`${skill.name}: ${skills[skill.name]}(Modifier: ${calculateModifier(attributes, skill.attributeModifier)})`}
            <button
              type="button"
              className="btn btn-primary btn-sm mx-1"
              onClick={() => addSkillPoints(skill.name, index)}
            >
              +
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm mx-1"
              onClick={() => reduceSkillPoints(skill.name, index)}
            >
              -
            </button>
            <div>Total: {skills[skill.name] + calculateModifier(attributes, skill.attributeModifier)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;