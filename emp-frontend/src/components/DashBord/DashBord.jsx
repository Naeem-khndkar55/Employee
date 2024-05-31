import Navbar from "../Navbar/Navbar";
import "./DashBord.css";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
const DashBord = () => {
  return (
    <>
      <Navbar />
      <div className="dashbord">
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBord;
