import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./Navbar.css";
const Navbar = () => {
  const [user] = useContext(userContext);
  console.log(user);
  return (
    <nav className="Nav-bar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          EMP-MGMT
        </Link>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <Link to="/employee" className="link">
              Employee
            </Link>

            <Link to="/dashboard" className="link">
              Dashboard
            </Link>
            <Link to="/addemployee" className="link">
              Add Employee
            </Link>
            <Link to="/editemployee" className="link">
              Edit employee
            </Link>
            <Link to="/login" className="link">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="link">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
