import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./Profile.css"; // Assuming you have Profile.css for external styling
import { useUrl } from "../../auth/UrlContext";
const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [starting, setStarting] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const url = useUrl();
  const { id } = useParams();

  useEffect(() => {
    Axios.get(`${url}/auth/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setEmployee(res.data.employee);
          setName(res.data.name);
          setEmail(res.data.email);
          setDesignation(res.data.designation);
          setSalary(res.data.salary);
          setStarting(new Date(res.data.starting).toISOString().split("T")[0]); // Assuming starting is a date string
          setDob(new Date(res.data.dob).toISOString().split("T")[0]);
          setAddress(res.data.address);
          setPhone(res.data.phone);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="profile-container">
      <h2>Employee Profile</h2>

      <div className="profile-info">
        <div>
          <label>Name:</label>
          <span>{name}</span>
        </div>
        <div>
          <label>Email:</label>
          <span>{email}</span>
        </div>
        <div>
          <label>Designation:</label>
          <span>{designation}</span>
        </div>
        <div>
          <label>Salary:</label>
          <span>{salary}</span>
        </div>
        <div>
          <label>Date of Starting:</label>
          <span>{starting}</span>
        </div>
        <div>
          <label>Address:</label>
          <span>{address}</span>
        </div>
        <div>
          <label>Phone:</label>
          <span>{phone}</span>
        </div>
        <div>
          <label>Date of Birth:</label>
          <span>{dob}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
