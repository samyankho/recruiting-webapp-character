export const initCharacter = () => ({
    attributes: {
      Strength: 10,
      Dexterity: 10,
      Constitution: 10,
      Intelligence: 10,
      Wisdom: 10,
      Charisma: 10,
    },
    skills: {
        Acrobatics: 0,
        ['Animal Handling']: 0,
        Arcana: 0,
        Athletics: 0,
        Deception: 0,
        History: 0,
        Insight: 0,
        Intimidation: 0,
        Investigation: 0,
        Medicine: 0,
        Nature: 0,
        Perception: 0,
        Performance: 0,
        Persuasion: 0,
        Religion: 0,
        ['Sleight of Hand']: 0,
        Stealth: 0,
        Survival: 0
    }
  });

  export const calculateModifier = (attributes, attribute) => {
    return Math.floor((attributes[attribute] - 10) / 2);
  };

  export const calculateTotalSkillPoints = (attributes) => {
    return 10 + 4 * calculateModifier(attributes, "Intelligence");
  };
  