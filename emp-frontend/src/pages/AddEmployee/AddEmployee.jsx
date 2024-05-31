import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [starting, setStarting] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  //const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(
      "http://localhost:3002/auth/addemployee",
      {
        name,
        email,
        designation,
        salary,
        starting,
        address,
        phone,
        dob,
      },
      {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        if (res.data.success) {
          toast.success("Employee added successfully", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/dashbord/employee");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <h2>Add Employee</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="designation">Designation</label>
        <input
          type="text"
          placeholder="designation"
          onChange={(e) => setDesignation(e.target.value)}
        />
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          placeholder="salary"
          onChange={(e) => setSalary(e.target.value)}
        />

        <label htmlFor="starting">Date of Starting</label>
        <input type="date" onChange={(e) => setStarting(e.target.value)} />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" onChange={(e) => setDob(e.target.value)} />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
