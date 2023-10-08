import { CLASS_LIST } from "../consts";

const Class = ({ attributes, setShowRequirements }) => {
  const meetRequirements = (className) => {
    for (const [key, value] of Object.entries(CLASS_LIST[className])) {
      if (attributes[key] < value) return false
    }
    return true;
  };

  return (
    <div className="col-sm border">
      <h2>Class</h2>
      {Object.keys(CLASS_LIST).map((className) => (
        <div key={className} className="list-group-item">
          <button
            type="button"
            className={`btn btn-lg btn-block m-1 ${
              meetRequirements(className) ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setShowRequirements(className)}
          >
            {className}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Class;
