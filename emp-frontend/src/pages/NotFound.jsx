import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="display: flex; align-items: center; justify-content: center;">
      <h1 className="color:red">404</h1>
      <h1 className="color:  blue">Page not Found</h1>
      <h2>
        Go <Link to="/">Home</Link>
      </h2>
    </div>
  );
};

export default NotFound;
