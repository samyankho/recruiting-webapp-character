import React from "react";

const SkillCheckResultDisplay = ({ skillCheckResult }) => {

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

export default SkillCheckResultDisplay;
