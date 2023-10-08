import { CLASS_LIST } from "../consts";

const Requirements = ({showRequirements, setShowRequirements}) => {
  return (
    <div className="col-sm border">
      <h2>Minimum Requirements</h2>
      <ul className="list-group">
      {Object.entries(CLASS_LIST[showRequirements]).map(([key, value]) => (
          <li key={key} className="list-group-item">
            {`${key}: ${value}`}
          </li>
        ))}
      </ul>
      <button onClick={() => setShowRequirements('')} type="button" className="btn btn-primary m-3">Close Requirements View</button>
    </div>
  );
};

export default Requirements;