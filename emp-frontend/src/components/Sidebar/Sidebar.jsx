import { useState } from "react";
import { Link } from "react-router-dom";
import { BsHouseDoorFill, BsPersonPlusFill } from "react-icons/bs";
import "./Sidebar.css";

const Sidebar = () => {
  const [active, setActive] = useState();
  return (
    <div className="sidebar">
      <div
        className={`sidebar-item , ${active === 0 ? "active" : ""}`}
        onClick={() => setActive(0)}
      >
        <Link className="sidebar-link">
          <BsHouseDoorFill className="sidebar-icon" />
          Dashboard
        </Link>
      </div>

      <div
        className={`sidebar-item , ${active === 1 ? "active" : ""}`}
        onClick={() => setActive(1)}
      >
        <Link to="/dashbord/employee" className="sidebar-link">
          <BsHouseDoorFill className="sidebar-icon" />
          Employee
        </Link>
      </div>

      <div
        className={`sidebar-item , ${active === 2 ? "active" : ""}`}
        onClick={() => setActive(2)}
      >
        <Link to="/dashbord/addemployee" className="sidebar-link">
          <BsPersonPlusFill className="sidebar-icon" />
          Add Employee
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
