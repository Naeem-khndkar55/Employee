import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaPenSquare, FaTrashAlt, FaUser } from "react-icons/fa";
import Axios from "axios";
import "./Employee.css";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const MySwal = withReactContent(Swal);
  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3002/auth/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then(() => {
            setEmployees(employees.filter((employee) => employee._id !== id));
            MySwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            // setEmployees(employees.filter((employee) => employee._id !== id));
            MySwal.fire({
              title: "Error!",
              text: err.message || "Error Occurred.",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/dashbord/editemployee/${row._id}`}>
            <FaPenSquare
              className="table-icon1"
              // onClick={() => handleEdit(row)}
            />
          </Link>
          <Link to={`/dashbord/employee`}>
            <FaTrashAlt
              className="table-icon2"
              onClick={() => handleDelete(row._id)}
            />
          </Link>
          <Link to={`/dashbord/profile/${row._id}`}>
            <FaUser
              className="table-icon3"
              // onClick={() => handleDelete(row)}
            />
          </Link>
        </>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    Axios.get("http://localhost:3002/auth/employees", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setEmployees(res.data.employees);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="element">
        <DataTable columns={columns} data={employees} pagination />
      </div>
    </>
  );
};

export default Employee;
