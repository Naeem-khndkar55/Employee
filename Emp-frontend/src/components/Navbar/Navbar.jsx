import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const MySwal = withReactContent(Swal);
  const navgate = useNavigate();
  const [user, setUser] = useContext(userContext);
  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navgate("/");
        setUser(null);
      }
    });
  };

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
            <Link to="/dashbord" className="link">
              Dashboard
            </Link>
            <span className="link">{user.name}</span>
            <button className="link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
