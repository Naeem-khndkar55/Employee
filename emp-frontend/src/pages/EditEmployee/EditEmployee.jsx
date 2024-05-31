import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./EditEmployee.css"; // Assuming you have AddEmployee.css for external styling

const EditEmployee = () => {
  const [employee, setEmployee] = useState([]);
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
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.put(
      `http://localhost:3002/auth/updateemployee/${id}`,
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
          toast.success("Employee editted successfully", {
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

  useEffect(() => {
    Axios.get(`http://localhost:3002/auth/employee/${id}`, {
      // Corrected the endpoint URL
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
    <div className="container">
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <h2>Edit Employee</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="designation">Designation</label>
        <input
          type="text"
          placeholder="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          placeholder="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label htmlFor="starting">Date of Starting</label>
        <input
          type="date"
          value={starting}
          onChange={(e) => setStarting(e.target.value)}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button type="submit">Edit Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
