import { ATTRIBUTE_LIST } from "../consts";
import { calculateModifier } from "../utils/shareHelper";

const Attributes = ({
  index,
  attributes,
  addAttributePoints,
  reduceAttributePoints,
}) => {
  return (
    <div className="col-sm border">
      <h2>Attributes</h2>
      <ul className="list-group">
        {ATTRIBUTE_LIST.map((attribute) => (
          <li key={attribute} className="list-group-item">
            {`${attribute}: ${attributes[attribute]}(Modifier: ${calculateModifier(attributes, attribute)})`}
            <button
              type="button"
              className="btn btn-primary btn-sm m-1"
              onClick={() => addAttributePoints(attribute, index)}
            >
              +
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => reduceAttributePoints(attribute, index)}
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attributes;
